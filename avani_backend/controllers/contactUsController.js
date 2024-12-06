const asyncHandler = require("express-async-handler");
const { ContactUs } = require("../models");

// @des      Get All Contact
// @route    GET /api/contact
// @Access   Public
const getContact = asyncHandler(async (req, res) => {
  const contact = await ContactUs.findAll();
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(400);
    throw new Error("Contact Not Found");
  }
});

// @des      Create Contact
// @route    POST /api/Description
// @Access   Private
const createContact = asyncHandler(async (req, res) => {
  const { phone, street, address, email, fbLink, instaLink } = req.body;

  const newContact = await ContactUs.create({
    phone,
    street,
    address,
    email,
    fbLink,
    instaLink,
  });

  if (newContact) {
    res.status(201).json({
      success: true,
      contact: newContact,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @des      Update Contact
// @route    PUT /api/contact/:uuid
// @Access   Private
const updateContact = asyncHandler(async (req, res) => {
  const { phone, street, address, email, fbLink, instaLink } = req.body;

  const contactExit = await ContactUs.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (contactExit) {
    contactExit.phone = phone || contactExit.phone;
    contactExit.street = street || contactExit.street;
    contactExit.address = address || contactExit.address;
    contactExit.email = email || contactExit.email;
    contactExit.fbLink = fbLink || contactExit.fbLink;
    contactExit.instaLink = instaLink || contactExit.instaLink;

    const updatedContact = await contactExit.save();
    if (updatedContact) {
      res.status(201).json({
        success: true,
        contact: updateContact,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});

// @des      Delete Contact
// @route    DELETE /api/contact/:uuid
// @Access   Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await ContactUs.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (contact) {
    await contact.destroy();
    res.json({
      success: true,
      message: "contact Deleted",
    });
  } else {
    res.status(400);
    throw new Error("This Contact Us Can not Be Deleted");
  }
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
