import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Footer from "./includes/Footer";
import "./scss/style.scss";
import ReguserEdit from "./pages/UsersList/ReguserEdit";



function UsersListedit() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <ReguserEdit />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default UsersListedit;