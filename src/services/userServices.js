import APIRoutes from '../routes/APIRoutes';
import {ServerURL} from '../server/serverUrl';

// Function to check if email or mobile number already exists
export const checkExistingUser = async (email, mobileNumber) => {
  const apiEndpoint = APIRoutes.APP_CHECK_EXISTING_USER; 
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        EmailId: email,
        MobileNumber: mobileNumber,
      },
      body: JSON.stringify({
        Comid: ServerURL.COMPANY_REF_ID,        
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Returning the API response for further checks
    } else {
      console.error("Error checking existing user");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while checking user details.");
  }
};

// Function to register the user
export const registerUser = async (userDetails) => {
  console.log("userDetails:", userDetails);
  const apiEndpoint = APIRoutes.APP_REGISTER_USER; 
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        objData: JSON.stringify(userDetails),
      },
      body: JSON.stringify(userDetails),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Returning API response after successful registration
    } else {
      console.error("Failed to create account.");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while creating the account.");
  }
};

// Function to login the user
export const loginUser = async (mobileNumber, password) => {
  const apiEndpoint = APIRoutes.APP_LOGIN_USER;
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        MobileNumber: mobileNumber, Password: password
      },
      body: JSON.stringify({
        Comid: ServerURL.COMPANY_REF_ID,        
      }), 
    });

    return await response.json(); 
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false };
  }
};


