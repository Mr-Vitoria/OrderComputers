using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using admin_panel_react.Models;

namespace admin_panel_react.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FeedbacksController : Controller
    {
        private readonly ApplicationDbContext _context;

        public FeedbacksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Feedback>> Index()
        {
            await _context.Users.LoadAsync();

            return await _context.Feedbacks.ToListAsync();
        }

        [Route("detail")]
        public async Task<Feedback?> Details(int? id)
        {
            if (id == null || _context.Feedbacks== null)
            {
                return null;
            }

            await _context.Users.LoadAsync();

            var feedback = await _context.Feedbacks
                .FirstOrDefaultAsync(m => m.Id == id);

            return feedback;
        }

        [Route("getselectlists")]
        public object GetSelectLists()
        {
            var model = new
            {
                Users = new SelectList(_context.Users, "Id", "Name")
            };
            return model;
        }

        [Route("create")]
        public async Task<string> Create(int userId, string Text)
        {
            Feedback feedback = new Feedback
            {
                UserId = userId,
                Text = Text
            };

            if (ModelState.IsValid)
            {
                _context.Add(feedback);
                await _context.SaveChangesAsync();
                return "Ok";
            }
            return "Error create Feedback";
        }

        [HttpGet]
        [Route("edit")]
        public async Task<string> Edit(int id, int userId, string Text)
        {
            Feedback feedback = new Feedback
            {
                Id = id,
                UserId = userId,
                Text = Text

            };
            try
            {
                _context.Update(feedback);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeedbackExists(feedback.Id))
                {
                    return "Error update from edit Feedback";
                }
                else
                {
                    throw;
                }
            }
            return "Ok";
        }

        [Route("delete")]
        public async Task<string> Delete(int id)
        {
            if (_context.Feedbacks == null)
            {
                return "Error delete Feedback: Entity is nnull";
            }
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback != null)
            {
                _context.Feedbacks.Remove(feedback);
            }

            await _context.SaveChangesAsync();
            return "Ok";
        }

        private bool FeedbackExists(int id)
        {
          return (_context.Feedbacks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
