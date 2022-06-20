// Our modules / classes
import Contact_Form from "./modules/CreateUser_Form"

// Instantiate a new object using our modules/classes
var contact_form = new CreateUser_Form()

// Allow new JS and CSS to load in browser without a traditional page refresh
if (module.hot) {
  module.hot.accept()
}
