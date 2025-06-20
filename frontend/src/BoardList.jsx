import KudosBoard from "./KudosBoard";
import './BoardList.css'

const BoardList = ({data, deleteBoard}) => {
    return (
        <main>
            <div className="board-list-container">
                {
                    data.map(obj => {
                        return (
                            <KudosBoard key={obj.id} id={obj.id} image={obj.image} title={obj.title} category={obj.category} author={obj.author} deleteBoard={deleteBoard}/>
                        )
                    })
                }
            </div>
        </main>
    )
}

export default BoardList;