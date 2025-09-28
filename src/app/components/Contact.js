"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault();

    await fetch("https://portfolio-backend.lndo.site/jsonapi/node/contact_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data: {
          type: "node--contact_message",
          attributes: {
            title: form.name,
            field_field_name: form.name,
            field_field_email: form.email,
            field_field_message: form.message,
            status: false,
          },
        },
      }),
    });
 alert("Thank you for your message!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div id="contactSection">
      <h1>Contact</h1>
      <form onSubmit={handleSubmit} id="contactForm">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" />
        <button type="submit" id="submitButton">Send</button>
      </form>
    </div>
  );
}
