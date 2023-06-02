// import PAULeftImage from '../../img/PAU-left.jpg';
import PAULeftImage from '../../img/PAU-left.jpg'

export const Home = () => {
    return (
        <div className="container mt-6">
            <div className="columns is-centered">
                <div className="column mt-2 box has-text-centered mt-6">
                    <figure className="image is-128x128">
                        <img className="is-rounded" src={PAULeftImage} alt="PAU Left"/>
                    </figure>
                </div>
            </div>
        </div>
    )
}

export default Home;