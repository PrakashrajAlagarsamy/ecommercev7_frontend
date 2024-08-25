import APIRoutes from '../routes/APIRoutes';
import {ServerURL} from '../server/serverUrl';

export const API_FetchProductByIndexPage = async () => {
    let objData = "";
    let objlist = {
        Comid: ServerURL.COMPANY_REF_ID,
    };
    try {
        const response = await fetch(`${APIRoutes.GET_PRODUCT_BY_INDEX_PAGE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                objData: objData,
            },
            body: JSON.stringify(objlist)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        if (!data.data1 || !Array.isArray(data.data1)) {
            throw new Error('No data found.');
        }
        return data;
    } catch (error) {
        console.error('Failed to fetch details:', error);
        throw error; // Re-throw so the calling function can handle it
    }
};


export const API_FetchProductByCategory = async (CategoryId, Multipleitems, Startindex, PageCount) => {
    let objlist = {
        Comid: ServerURL.COMPANY_REF_ID,
    };
    try {
        const response = await fetch(`${APIRoutes.GET_PRODUCT_BY_CATEGORY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                CId: CategoryId,
                Multipleitems: Multipleitems,
                Startindex: Startindex,
                PageCount: PageCount
            },
            body: JSON.stringify(objlist)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        if (!data || !Array.isArray(data)) {
            throw new Error('No data found.');
        }
        return data;
    } catch (error) {
        console.error('Failed to fetch details:', error);
        throw error; // Re-throw so the calling function can handle it
    }
};


export const API_FetchProductBySubCategory = async (SubCategoryId, Multipleitems, Startindex, PageCount) => {
    let objlist = {
        Comid: ServerURL.COMPANY_REF_ID,
    };
    try {
        const response = await fetch(`${APIRoutes.GET_PRODUCT_BY_SUBCATEGORY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                SId: SubCategoryId,
                Multipleitems: Multipleitems,
                Startindex: Startindex,
                PageCount: PageCount
            },
            body: JSON.stringify(objlist)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        if (!data || !Array.isArray(data)) {
            throw new Error('No data found.');
        }
        return data;
    } catch (error) {
        console.error('Failed to fetch details:', error);
        throw error; // Re-throw so the calling function can handle it
    }
};