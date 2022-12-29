//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContact = (request, response) => {
  response.status(200).json({ message: "Get all contacts." });
};

//@desc Get single contact
//@route Get /api/contact/:id
//@access public
const getSingleContact = (request, response) => {
  response.status(200).json({ message: `Get contact for ${request.params.id}` });
};

//@desc Create new contact
//@route POST /api/contacts
//@access public
const createContact = (request, response) => {
  console.log('The request body is', request.body)   
  const {name, email, number} = request.body
  if(!name || !email || !number){
    throw new Error("All fields must be entered.")
  }
  response.status(201).json({ name: name, email: email, number: number });
//   response.status(201).json({ message: "Create contact." });
};

//@desc update contact
//@route PUT /api/contacts:id
//@access public
const updateContact = (request, response) => {
  response.status(200).json({ message: `Update contact for ${request.params.id}` });
};

//@desc delete contact
//@route DELETE /api/contact/:id
//@access public
const deleteContact = (request, response) => {
  response.status(200).json({ message: `Delete contact for ${request.params.id}` });
};
module.exports = {
  getContact,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
