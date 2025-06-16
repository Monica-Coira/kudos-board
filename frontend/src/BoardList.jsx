import KudosBoard from "./KudosBoard";

const BoardList = ({data}) => {
    return (
        <main>
            <div className="board-list-container">
                {
                    data.map(obj => {
                        return (
                            <KudosBoard key={obj.id} image={obj.image} title={obj.title} category={obj.category} />
                        )
                    })
                }
            </div>
        </main>
    )
}

export default BoardList;