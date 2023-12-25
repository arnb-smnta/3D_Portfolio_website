import React, { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import Fox from "./models/Fox";
import { Loader } from "@react-three/drei";
const Contact = () => {
  const [currentanimation, setcurrentanimation] = useState("idle");
  const formRef = useRef(null);
  const [form, setform] = useState({ name: "", email: "", message: "" });
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleFocus = () => {
    setcurrentanimation("walk");
  };
  const handleblur = () => {
    setcurrentanimation("idle");
  };
  const [isLoading, setisLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    setcurrentanimation("hit");
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
        setform({ name: "", email: "", message: "" });
        setTimeout(() => {
          setcurrentanimation("idle");
        }, [3000]);
      })
      .catch((e) => {
        console.log(e);
        setisLoading(false);
        setcurrentanimation("idle");
      });
  };
  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in touch</h1>
        <form
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
          ref={formRef}
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

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <Suspense fallback={<Loader />}>
            <Fox
              currentanimations={currentanimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            ></Fox>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
