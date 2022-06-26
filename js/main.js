// Libraries
import '@popperjs/core'
import 'bootstrap';
import 'bootstrap-table'
import '@fortawesome/fontawesome-free'


// Our modules / classes
import "../css/style.css"
import CreateUser_Form from "./modules/CreateUser_Form"

// Instantiate a new object using our modules/classes
var createUser_form = new CreateUser_Form()

// // Allow new JS and CSS to load in browser without a traditional page refresh

if (module.hot) {
    module.hot.accept()
}