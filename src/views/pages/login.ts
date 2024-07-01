const loginForm = () => {
  return `
      <div class="form">
      <figure class="form__left">
        <img
          class="form__left--logo"
          src="/big-logo.671339c0.svg"
          alt=""
        />
        <img
          class="form__left--bigshoes"
          src="/big-shoes.de5dfd28.png"
          alt=""
        />
      </figure>
      <form class="form__right">
        <div>
          <h1>Login</h1>
          <a href="">Forgot your password?</a>
        </div>

        <input class="form__right--input" type="text" placeholder="Email" />

        <input
          class="form__right--input"
          type="password"
          placeholder="Password"
        />

        <div class="form__right--checkbox">
          <input type="checkbox" />
          <label for=""
            >Keep me logged in - applies to all log in options below.
            <u>More info</u></label
          >
        </div>

        <button>
          <span>EMAIL LOGIN</span>
          <img src="/dist/arrow_forward.b47cf309.svg" alt="" />
        </button>

        <figure class="form__right--social">
          <img
            class="form__right--icon"
            src="/logos_google-icon.0fa71755.svg"
            alt=""
          />
          <img
            class="form__right--icon"
            src="/ic_baseline-apple.389b3e45.svg"
            alt=""
          />
          <img
            class="form__right--icon"
            src="/logos_facebook.b80ecd78.svg"
            alt=""
          />
        </figure>

        <p>
          By clicking 'Log In' you agree to our website Kicks<u
            >Club Terms & Conditions, Kicks Privacy Notice</u
          >
          and <u>Terms & Conditions.</u>
        </p>
      </form>
    </div>
  `;
};
export default loginForm;
