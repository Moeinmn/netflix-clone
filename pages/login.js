import styles from "../styles/Login.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic";

const Login = () => {
  let [email, setEmail] = useState("moein.chief@gmail.com");
  let [did, setDid] = useState();
  let [isError, setIsError] = useState(false);
  let [magicLoading, setMagicLoading] = useState(false);
  let router = useRouter();

  let handleClick = async (email) => {
    if (!email || !email.includes("@")) {
      setIsError("Please enter valid email");
      return;
    }
    // get did from redux
    if (did) {
      //redirect
      router.push("/");
      return;
    }
    try {
      setMagicLoading(true);
      let didToken = await magic.auth.loginWithMagicLink({ email: `${email}` });
      console.log(didToken);
      setDid(didToken);
      await fetch(`/api/hasuraLogin/?didToken=${didToken}`, { method: "POST" });
      setMagicLoading(false);
      router.push("/");
    } catch (err) {
      setIsError("Something went wrong logging in");
    }
  };

  return (
    <>
      <section className={styles.container}>
        <span className={styles.logoContainer}>
          <Image
            src="/netflix.svg"
            width={100}
            height={80}
            quality={100}
            alt="logo img"
          />
        </span>
        <div className={styles.loginContainer}>
          <br />
          <p>Sign In</p>
          <br />
          <form autoComplete="on">
            <input
              type="text"
              value={email}
              autoComplete="on"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </form>
          {isError && <p className={styles.errorMessage}>{isError}</p>}
          <br />
          <br />
          <button onClick={() => handleClick(email)}>
            {magicLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </section>
    </>
  );
};

export default Login;
