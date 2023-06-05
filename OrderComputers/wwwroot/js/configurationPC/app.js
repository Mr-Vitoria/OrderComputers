import SelectLists from './selectLists'

function ReactElement() {
    const now = new Date();
    const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0
    );

    var secondsToNight = Math.round((night.getTime() - now.getTime()) / 1000);
    return <>
    <SelectLists />
    </>;
}
ReactDOM.createRoot(
    document.getElementById('root')
).render(
    <ReactElement />
);