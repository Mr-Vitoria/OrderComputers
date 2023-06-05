(function ($) {
    $.fn.selectbox = function () {
        var selectDefaultHeight = $('.selectboxss').height();
        $('.selectboxss .selectboxssvalue').click(function () {
            var currentHeight = $(this).closest(".selectboxss").height();
            if (currentHeight < 100 || currentHeight == selectDefaultHeight) {
                $(this).closest(".selectboxss").height("250px");
                $(this).find('.arrowselect').attr("style", "border-radius: 1000px;transition: 0.2s;transform: rotate(180deg);padding: 0px 0px 0px 10px;");
            }
            if (currentHeight >= 250) {
                $(this).closest(".selectboxss").height(selectDefaultHeight);
                $(this).find('.arrowselect').attr("style", "rotate(0deg);padding: 0px 10px 0px 0px;");
            }
        });
        $('li.selectoption').click(function () {
            $(this).closest(".selectboxss").height(selectDefaultHeight);
            $(this).closest(".selectboxss").find('.arrowselect').attr("style", "rotate(0deg);padding: 0px 10px 0px 0px;");
            console.log($(this).closest(".selectboxss").find('.selectboxssvalue input')[0]);
            $(this).closest(".selectboxss").find('.selectboxssvalue input')[0].value = this.getElementsByTagName('input')[1].value;

        });
    };
})(jQuery);
