import ServerURL from "../server/serverUrl";

export const APIRoutes = {
    //Authentication API's
    APP_CHECK_EXISTING_USER: `${ServerURL.PRODUCTION_HOST_URL}api/WebMobileApp/AppEmailMobileCheck`,
    APP_REGISTER_USER: `${ServerURL.PRODUCTION_HOST_URL}api/CustomerApp/InsertCustomer`,
    APP_LOGIN_USER: `${ServerURL.PRODUCTION_HOST_URL}api/WebMobileApp/Login`,
    APP_FORGET_PASSWORD: `${ServerURL.PRODUCTION_HOST_URL}api/WebMobileApp/ForgetPassword`,

    //Category API's
    GET_TOP_CATEGORIES: `${ServerURL.PRODUCTION_HOST_URL}api/CategoryApp/SelectCategory`,
    GET_CATEGORY_BY_ID: (id) => `${ServerURL.PRODUCTION_HOST_URL}api/CategoryApp/SelectCategory/${id}`,

    //Offer post (banner slider) and offer product API's
    GET_BANNER_OFFER_POST: `${ServerURL.PRODUCTION_HOST_URL}api/OfferPost/SelectOfferPost`,
    GET_OFFER_FAST_MOVING_PRODUCT: `${ServerURL.PRODUCTION_HOST_URL}api/WebMobileApp/OfferProductFastingMovingProduct`,

    //Main product index page
    GET_PRODUCT_BY_INDEX_PAGE: `${ServerURL.PRODUCTION_HOST_URL}api/WebMobileApp/SelectProductByCategoryIndexPage`,
};

export default APIRoutes;
