import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
const Contact = () => {
  const formRef = useRef(null);
  const [form, setform] = useState({ name: "", email: "", message: "" });
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleFocus = () => {};
  const handleblur = () => {};
  const [isLoading, setisLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_APP_serviceID,
        import.meta.env.VITE_APP_templateID,
        {
          from_name: form.name,
          to_name: "arnab",
          from_email: form.email,
          to_email: "loveumearnab.2812000@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_publicID
      )
      .then(() => {
        setisLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setisLoading(false);
      });
  };
  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in touch</h1>
        <form
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Arnab"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleblur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input
              type="text"
              name="email"
              className="input"
              placeholder="Arnab@arnab.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleblur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Message
            <textarea
              name="message"
              className="input"
              rows={4}
              placeholder="Let me know how we can collaborate"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleblur}
            />
          </label>

          <button
            type="submit"
            className="btn"
            disable={isLoading}
            onFocus={handleFocus}
            onBlur={handleblur}
          >
            {isLoading ? "sending ...." : "send message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
