import { useState } from 'react';
import errorIcon from '/images/icon-error.svg'

export default function Form() {
  const [formData, setFormData] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
      }
  );
    
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const {name, value} = e.target;

    setFormData(prevData => {
      return {
        ...prevData,
        [name]: value            
      }
    })
  };

  function handleSubmit(e) {
      e.preventDefault();
      const newErrors = validateForm(formData);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        console.log('submisstion successful');
      } else {
        console.log('submission failed')
      }
  };

  const validateForm = (data) => {
    const errors = {};
    const errorEmpty = ' cannot be empty';
    const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


    if (!data.firstName.trim()) {
      errors.firstName = 'First Name' + errorEmpty;
    }

    if (!data.lastName.trim()) {
      errors.lastName = 'Last Name' + errorEmpty;
    }

    if (!data.email.trim()) {
      errors.email = 'Email' + errorEmpty;
    } else if (!data.email.match(emailRegEx)) {
      errors.email = 'Looks like this is not an email'
    }

    if (!data.password) {
      errors.password = 'Password' + errorEmpty;
    }

    return errors;
  }

    return (
        <form className="subscription-form" noValidate
            onSubmit={handleSubmit}>
            
            <div className="input-wrapper">
              <input type="text"
                placeholder="First Name" 
                name="firstName" 
                id="firstName"
                value={formData.firstName}
                onChange={handleChange} 
                className={errors.firstName && 'input-error'}
                />

                {errors.firstName && (
                  <div>
                    <img src={errorIcon} alt="error icon" className="error-icon" /> 
                    <p className="error-msg">{errors.firstName}
                    </p>
                  </div>
                )}
            </div>

            <div className="input-wrapper">
                <input type="text" 
                    name="lastName" 
                    id="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange} 
                    className={errors.lastName && 'input-error'}/>
                  {errors.lastName && (
                    <div>
                    <img src={errorIcon} alt="error icon" className="error-icon" /> 
                    <p className="error-msg">{errors.lastName} 
                    </p>
                    </div>
                  )}
                  

            </div>
                
            <div className="input-wrapper">
                <input type="email" 
                    name="email" 
                    id="email"
                    value={formData.email}
                    placeholder="Email Address"
                    onChange={handleChange} 
                    className={errors.email && 'input-error'}
                    />
                    {errors.email && (
                      <div>
                        <img src={errorIcon} alt="error icon" className="error-icon" />
                <p className="error-msg">
                {errors.email}
              </p>
                      </div>
                    )}
                 
            </div>

            <div className="input-wrapper">
                <input type="password" 
                    name="password" 
                    id="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleChange} 
                    className={errors.password && 'input-error'}
                    />

                  {errors.password && (
                    <div>
                       <img src={errorIcon} alt="error icon" className="error-icon" />
                <p className="error-msg">
                {errors.password}
              </p>
                    </div>
                  )}
 
            </div>

            <button className="submit-btn">claim your free trial</button>
            <p className="disclaimer">
            By clicking the button, you are agreeing to our <a href="#" className="terms">Terms and Services</a>
            </p>
        </form>
    )
}