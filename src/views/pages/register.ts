const registerForm = () => {
  return `
    <div class="resform">
      <figure class="resform__left">
        <img
          class="resform__left--logo"
          src="/big-logo.671339c0.svg"
          alt=""
        />
        <img
          class="resform__left--bigshoes"
          src="/big-shoes.de5dfd28.png"
          alt=""
        />
      </figure>
      <form class="resform__right">
        <div>
          <h1>Register</h1>
          <p>Sign up with</p>
        </div>

        <figure class="resform__right--social">
          <img
            class="resform__right--icon"
            src="/logos_google-icon.0fa71755.svg"
            alt=""
          />
          <img
            class="resform__right--icon"
            src="/ic_baseline-apple.389b3e45.svg"
            alt=""
          />
          <img
            class="resform__right--icon"
            src="/logos_facebook.b80ecd78.svg"
            alt=""
          />
        </figure>

        <p>OR</p>

        <div class="resform__right--input">
          <h2>Your name</h2>
          <input id="firstName" type="text" placeholder="First name" />
          <input id="lastName" type="text" placeholder="Last name" />
        </div>

        <div class="resform__right--input">
          <h2>Login details</h2>
          <input type="email" id="email" placeholder="Email" />
          <input id="password" type="password" placeholder="Password" />
          <p id="para">
            Minimum 8 characters with at least one uppercase, one lowercase,
            one special character and a number
          </p>
        </div>

        <div class="resform__right--checkbox">
          <input type="checkbox" />
          <label for=""
            >By clicking 'Log In' you agree to our website Kicks<u>Club Terms &
            Conditions, Kicks Privacy Notice</u> and <u>Terms & Conditions.</u></label
          >
        </div>

        <div class="resform__right--checkbox">
          <input type="checkbox" />
          <label for=""
            >Keep me logged in - applies to all log in options below. More
            info</label
          >
        </div>

        <button>
          <span>REGISTER</span>
          <img src="/arrow_forward.b47cf309.svg" alt="" />
        </button>
      </form>
    </div>
  `;
};
export default registerForm;
