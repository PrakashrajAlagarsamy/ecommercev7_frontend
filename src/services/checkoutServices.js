import APIRoutes from '../routes/APIRoutes';

// Insert My order
export const API_InsertSaleOrderSave = async (objlist) => {
    console.log('objlist', objlist);
    try {
      const response = await fetch(`${APIRoutes.INSERT_SALE_ORDER_SAVE}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          objData: ''
        },
        body: JSON.stringify(objlist)
      });      
      if (response.ok) {
        const data = await response.json();
        return data; 
      } else {
        console.error("Error checking existing user");
        return null;
      }
    } catch (error) {
      console.error('Failed to insert favorite product list:', error);
      throw error; // Re-throw so the calling function can handle it
    }
  };