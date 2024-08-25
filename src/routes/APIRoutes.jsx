import ServerURL from "../server/serverUrl";

export const APIRoutes = {
    //Settings API
    GET_SETTINGS_DETAILS: `${ServerURL.PRODUCTION_HOST_URL}/api/WebMobileApp//SelectSettingsNew1`,

    //Authentication API's
    APP_CHECK_EXISTING_USER: `${ServerURL.PRODUCTION_HOST_URL}api/WebMobileApp/AppEmailMobileCheck`,
    APP_REGISTER_USER: `${ServerURL.PRODUCTION_HOST_URL}api/CustomerApp/InsertCustomer`,
    APP_LOGIN_USER: `${ServerURL.PRODUCTION_HOST_URL}api/WebMobileApp/Login`,
    APP_FORGET_PASSWORD: `${ServerURL.PRODUCTION_HOST_URL}api/WebMobileApp/ForgetPassword`,

    //Category and Subcategory API's
    GET_TOP_CATEGORIES: `${ServerURL.PRODUCTION_HOST_URL}api/CategoryApp/SelectCategory`,
    GET_CATEGORY_SUBCATEGORY: `${ServerURL.PRODUCTION_HOST_URL}api/ItemmasterApp/SelectSubCategorId`,

    //Offer post (banner slider) and offer product API's
    GET_BANNER_OFFER_POST: `${ServerURL.PRODUCTION_HOST_URL}api/OfferPost/SelectOfferPost`,
    GET_OFFER_FAST_MOVING_PRODUCT: `${ServerURL.PRODUCTION_HOST_URL}api/WebMobileApp/OfferProductFastingMovingProduct`,

    //Main product index page
    GET_PRODUCT_BY_INDEX_PAGE: `${ServerURL.PRODUCTION_HOST_URL}api/WebMobileApp/SelectProductByCategoryIndexPage`,
    GET_PRODUCT_BY_CATEGORY: `${ServerURL.PRODUCTION_HOST_URL}api/WebMobileApp/SelectProductByCategory`,
    GET_PRODUCT_BY_SUBCATEGORY: `${ServerURL.PRODUCTION_HOST_URL}api/WebMobileApp/SelectProductBySubCategory`,
};

export default APIRoutes;
