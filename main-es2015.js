(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+wL8":
/*!*************************************************************!*\
  !*** ./src/app/component/authentication/payment.service.ts ***!
  \*************************************************************/
/*! exports provided: PaymentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentService", function() { return PaymentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "AytR");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _pay_success_pay_success_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pay-success/pay-success.component */ "DBZS");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var src_app_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/component/authentication/auth.service */ "ddlN");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");









const PAYMENT_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].Apiurl + '/payment/';
class PaymentService {
    // tslint:disable-next-line:no-shadowed-variable
    constructor(http, authService, matDialog, router) {
        this.http = http;
        this.authService = authService;
        this.matDialog = matDialog;
        this.router = router;
        this.email = '';
        this.paymentSuccess = false;
        this.paySuccessListener = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.customCard = '';
        this.outletDetail = {
            _id: ''
        };
        // tslint:disable-next-line:variable-name
        this.payment_creation_id = null;
        this.obj = {
            reciepient_name: '',
            reciepient_email: '',
            your_name: '',
            your_email: '',
            radioValue: 500,
            couponCount: 1,
            radioValueCustom: ''
        };
        this.razorPayOptions = {
            key: '',
            amount: '',
            currency: 'INR',
            name: '',
            branch: '',
            contact: '',
            email: '',
            description: '',
            order_id: '',
            image: 'https://ninthsem-a86d3.web.app/assets/images/ninthsemlogo.png',
            handler(response) {
                // console.log('this is the response ');
            },
            notes: {
                address: 'Thank you for saving people in need'
            },
            theme: {
                color: '#F0C651'
            },
            http_post: this.authService
        };
        PaymentService.API_SERVICE = this.authService;
        PaymentService.MaT_dLG = this.matDialog;
        PaymentService.MAT_ROUTER = this.router;
    }
    // payment status
    getPaymentStatus() {
        return this.paymentSuccess;
    }
    getPaymentStatusListener() {
        return this.paySuccessListener.asObservable();
    }
    // tslint:disable-next-line:contextual-lifecycle
    ngOnInit() {
        // console.log(this.router);
    }
    // http_post(url, body) {
    //   return this.http.post<any>(PAYMENT_URL + url, body);
    // }
    // // tslint:disable-next-line:variable-name
    // setPayment(_id: string, payment: string, signature: string) {
    //   console.log(_id, payment, signature);
    //   const values = {
    //     _id, payment, signature
    //   };
    //   return this.http.post<any>(PAYMENT_URL + 'payment', values);
    // }
    // http_delete(url, body) {
    //   console.log(body);
    //   return this.http.delete<any>(PAYMENT_URL + url, body);
    // }
    onPay(form) {
        if (form.invalid) {
            return;
        }
        else {
            this.payWithRazor(form);
            // this.router.navigate(['/']);
        }
    }
    // this.userid = this.authService.getUserId();
    // console.log(this.userid);
    // this.username = this.authService.Username();
    // this.firstname = this.authService.Firstname();
    // this.lastname = this.authService.Lastname();
    // this.email = this.authService.Gmail();
    // this.course = this.authService.Course();
    // this.branch = this.authService.userBranch();
    payWithRazor(event) {
        //  console.log(event.form.value.amount);
        const finalObject = {
            _id: '',
            user_id: this.authService.getUserId(),
            business_id: this.outletDetail._id,
            amount: this.authService.getPackageDetails().pkgAmount || 998,
            recipient_name: this.authService.Firstname() + ' ' + this.authService.Lastname(),
            recipient_email: this.authService.Gmail(),
            user_email: this.authService.Gmail(),
            user_name: this.authService.Firstname() + ' ' + this.authService.Lastname(),
            user_branch: this.authService.userBranch(),
            user_contact: this.authService.userContactNumber(),
            user_coupon: this.authService.RefferalCode()
        };
        // const finalObject1 = {
        //   _id: '',
        //   user_id: this.authService.getUserId(),
        //   business_id: this.outletDetail._id,
        //   amount: event.form.value.amount,
        //   recipient_name: this.obj.reciepient_name,
        //   recipient_email: this.obj.reciepient_email,
        //   user_email: event.form.value.email,
        //   user_name: event.form.value.name,
        //   user_branch: event.form.value.branch,
        //   user_contact: event.form.value.contact
        // };
        //  console.log('this is the final object ', finalObject);
        this.authService.http_post('purchase', finalObject)
            .subscribe((response) => {
            //   console.log('response for purchase ', response);
            const payload = response;
            if (payload.key && payload.value.id && payload.value.amount) {
                // if (payload.key && payload.dbRes.order.id && payload.dbRes.order.amount) {
                this.razorPayOptions.key = payload.key;
                this.razorPayOptions.amount = payload.value.amount;
                this.razorPayOptions.name = payload.user_data.name;
                this.razorPayOptions.email = payload.user_data.email;
                this.razorPayOptions.branch = payload.user_data.branch;
                this.razorPayOptions.contact = payload.user_data.contact;
                this.razorPayOptions.order_id = payload.value.id;
                this.razorPayOptions.description = 'Payment for ' + this.authService.getPackageDetails().pkgName + ' Package';
                this.razorPayOptions.handler = this.razorPayResponseHandler;
                //  console.log('op', this.razorPayOptions);
                const rzp1 = new Razorpay(this.razorPayOptions);
                rzp1.open();
                //  console.log('opened');
            }
            else {
                // bro show error here
            }
        }, (error) => {
            //    console.log('error', error);
        });
    }
    razorPayResponseHandler(response) {
        //  console.log('final response', response);
        sessionStorage.setItem('id', response.razorpay_order_id);
        sessionStorage.setItem('payment', response.razorpay_payment_id);
        sessionStorage.setItem('signature', response.razorpay_signature);
        //  console.log(sessionStorage.getItem('id'));
        //  console.log(sessionStorage.getItem('payment'));
        //  console.log(sessionStorage.getItem('signature'));
        // const sess = JSON.parse(storage_data);
        //   console.log('storage ', sess);
        const paymentObject = {
            _id: sessionStorage.getItem('id'),
            payment: sessionStorage.getItem('payment'),
            signature: sessionStorage.getItem('signature'),
        };
        //  console.log('payment object >>>>>>>>>> ', paymentObject);
        PaymentService.API_SERVICE.setPayment(paymentObject)
            .subscribe(success => {
            if (success.success === true) {
                PaymentService.MaT_dLG.open(_pay_success_pay_success_component__WEBPACK_IMPORTED_MODULE_3__["PaySuccessComponent"]);
                // const URL = 'http://localhost:4200/';
                PaymentService.MAT_ROUTER.navigate([`/videos`]);
                // PaymentService.MAT_ROUTER.navigateByUrl('/videos', { skipLocationChange: true }).then(() => {
                //   PaymentService.MAT_ROUTER.navigate(['VideosListComponent']);
                // });
            }
        }, error => {
            //   console.log('error', error);
        });
    }
}
PaymentService.ɵfac = function PaymentService_Factory(t) { return new (t || PaymentService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](src_app_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"])); };
PaymentService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PaymentService, factory: PaymentService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PaymentService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] }, { type: src_app_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialog"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] }]; }, null); })();


/***/ }),

/***/ "/n1y":
/*!*******************************************************!*\
  !*** ./src/app/pageComponent/video/videos.service.ts ***!
  \*******************************************************/
/*! exports provided: VideosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideosService", function() { return VideosService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../environments/environment */ "AytR");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




const BACKEND_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].Apiurl + '/videoId';
class VideosService {
    constructor(http) {
        this.http = http;
        this.videoid = '';
        this.videoTitle = '';
        this.id = [];
    }
    videoId(value) {
        this.videoid = value;
        localStorage.setItem('videoid', value);
    }
    getBranchName() {
        return this.branch;
    }
    SelectedVideoTitle(title) {
        this.videoTitle = title;
        localStorage.setItem('videotitle', title);
    }
    getTitle() {
        return this.videoTitle;
    }
    getTimer() {
        return this.tokenTimer;
    }
    getVideoId() {
        return this.videoid;
    }
    getCivil() {
        return this.http.get(BACKEND_URL + '/getCivil');
    }
    getDemo() {
        return this.http.get(BACKEND_URL + '/getDemo');
    }
    getMech() {
        return this.http.get(BACKEND_URL + '/getMechanical');
    }
    getElectrical() {
        return this.http.get(BACKEND_URL + '/getElectrical');
    }
    getChemical() {
        return this.http.get(BACKEND_URL + '/getChemical');
    }
    getMetallurgy() {
        return this.http.get(BACKEND_URL + '/getMetallurgy');
    }
}
VideosService.ɵfac = function VideosService_Factory(t) { return new (t || VideosService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
VideosService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: VideosService, factory: VideosService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](VideosService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Programing\NinethSem\ninthsem\src\main.ts */"zUnb");


/***/ }),

/***/ "14eC":
/*!************************************************************!*\
  !*** ./src/app/pageComponent/pricing/pricing.component.ts ***!
  \************************************************************/
/*! exports provided: PricingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PricingComponent", function() { return PricingComponent; });
/* harmony import */ var _component_authentication_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../component/authentication/login/login.component */ "U5be");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _component_authentication_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../component/authentication/enum */ "v6DW");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../environments/environment */ "AytR");
/* harmony import */ var _util_util_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../util/util.service */ "izIa");
/* harmony import */ var src_app_component_authentication_payment_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/component/authentication/payment.service */ "+wL8");
/* harmony import */ var _component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../component/authentication/auth.service */ "ddlN");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "tk/3");










const BACKEND_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].Apiurl + '/coupons';
class PricingComponent {
    constructor(utilService, payment, userService, matDialog, http) {
        this.utilService = utilService;
        this.payment = payment;
        this.userService = userService;
        this.matDialog = matDialog;
        this.http = http;
    }
    ngOnInit() {
        this.pkg = _component_authentication_enum__WEBPACK_IMPORTED_MODULE_2__["PACKAGEDETAILS"];
        this.primaryCost = this.pkg.BASIC.pkgAmount;
        this.premiumCost = this.pkg.PREMIUM.pkgAmount;
        this.discount = this.userService.RefferalCode();
        let data = {
            code: this.userService.RefferalCode()
        };
        this.http.post(BACKEND_URL + '/gettype', data).subscribe(res => {
            this.type = res, this.getPriceBasedOnDisount();
        });
    }
    getPriceBasedOnDisount() {
        let primary = this.pkg.BASIC.pkgAmount;
        let premium = this.pkg.PREMIUM.pkgAmount;
        let type = this.type;
        if (type) {
            let dat = type.type.toString();
            if (dat == 2) {
                let perType = 60;
                // let totalValue = primary - (primary * perType);
                let totalValue = (primary / 100) * perType;
                this.primaryCost = (this.pkg.BASIC.pkgAmount - totalValue).toFixed(2);
                let PremiumCost = (premium / 100) * perType;
                this.premiumCost = (this.pkg.PREMIUM.pkgAmount - PremiumCost).toFixed(2);
                localStorage.setItem('basicCost', this.primaryCost);
                localStorage.setItem('premiumCost', this.premiumCost);
            }
            if (dat == 3) {
                let perType = 30;
                // let totalValue = primary - (primary * perType);
                let totalValue = (primary / 100) * perType;
                this.primaryCost = (this.pkg.BASIC.pkgAmount - totalValue).toFixed(2);
                let PremiumCost = (premium / 100) * perType;
                this.premiumCost = (this.pkg.PREMIUM.pkgAmount - PremiumCost).toFixed(2);
                localStorage.setItem('basicCost', this.primaryCost);
                localStorage.setItem('premiumCost', this.premiumCost);
            }
            if (dat == 4) {
                let perType = 20;
                // let totalValue = primary - (primary * perType);
                let totalValue = (primary / 100) * perType;
                this.primaryCost = (this.pkg.BASIC.pkgAmount - totalValue).toFixed(2);
                let PremiumCost = (premium / 100) * perType;
                this.premiumCost = (this.pkg.PREMIUM.pkgAmount - PremiumCost).toFixed(2);
                localStorage.setItem('basicCost', this.primaryCost);
                localStorage.setItem('premiumCost', this.premiumCost);
            }
            if (dat == 1) {
                this.primaryCost = this.pkg.BASIC.pkgAmount - this.pkg.BASIC.pkgAmount;
                this.premiumCost = (this.pkg.PREMIUM.pkgAmount - this.pkg.PREMIUM.pkgAmount).toFixed(2);
                localStorage.setItem('basicCost', this.primaryCost);
                localStorage.setItem('premiumCost', this.premiumCost);
            }
        }
    }
    gotoPaymentModule(pkgObj, cost) {
        console.log(cost);
        if (this.disableBuyNowButton_From_Login() || this.disableBuyNowButton_From_Session()) {
            this.paidUserText = this.getPaidUserText();
            return;
        }
        const isAuthenticated = this.userService.getIsAuth();
        if (!isAuthenticated) {
            this.matDialog.open(_component_authentication_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"]);
        }
        else {
            this.utilService.ScrollToTop();
            this.userService.setPackageDetails(pkgObj, cost);
            this.payment.payWithRazor();
        }
    }
    disableBuyNowButton_From_Login() {
        return this.userService.userPaymentId() && this.userService.userSignature();
    }
    disableBuyNowButton_From_Session() {
        return sessionStorage.getItem('payment') && sessionStorage.getItem('signature');
    }
    getPaidUserText() {
        if (this.disableBuyNowButton_From_Login() || this.disableBuyNowButton_From_Session()) {
            return 'Payment is already done.';
        }
        else {
            return '';
        }
    }
}
PricingComponent.ɵfac = function PricingComponent_Factory(t) { return new (t || PricingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_util_util_service__WEBPACK_IMPORTED_MODULE_4__["UtilService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_component_authentication_payment_service__WEBPACK_IMPORTED_MODULE_5__["PaymentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"])); };
PricingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: PricingComponent, selectors: [["app-pricing"]], decls: 75, vars: 3, consts: [["id", "pricing", 1, "pricing"], [1, "container"], ["data-aos", "fade-up", 1, "section-title"], [1, "row"], [1, "col-lg-6", "col-md-6", "mt-4", "mt-md-0"], ["data-aos", "zoom-in", "data-aos-delay", "100", 1, "box", "recommended"], [2, "display", "contents"], [1, "btn-wrap"], ["type", "button", "data-toggle", "modal", "data-target", "#user-registration", 1, "btn-buy", 3, "click"], [1, "col-lg-6", "col-md-6", "mt-4", "mt-lg-0"], ["data-aos", "zoom-in-left", "data-aos-delay", "200", 1, "box", "recommended"], [1, "col-12"], [2, "text-align", "center", "margin-top", "17px", "font-size", "17px", "font-weight", "bold"]], template: function PricingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Packages");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "CHOOSE YOUR PRICING PACKAGE TO REGISTER ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Basic");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "del");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "\u20B93998");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Early bird");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Certification Course on Industry Module (CCIM)");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Mock Tests");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Quick Doubt Clearance ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "CV/Resume Making");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "LinkedIn Profile Auditing & Feedback Report");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, "2 Mock Technical Interviews");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "1 Mock HR Interview");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "Compressive and Detailed Interview Feedback Report");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PricingComponent_Template_button_click_38_listener() { return ctx.gotoPaymentModule(ctx.pkg.BASIC, ctx.primaryCost); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39, "Buy Now");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "Premium");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "del");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](47, "\u20B96498");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](48);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](51, "Early bird");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](53, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](54, "Certification Course On Industry Module (CCIM)");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](55, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](56, "Mock Tests");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58, "Quick Doubt Clearance");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](60, "CV/Resume Making");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](61, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](62, "LinkedIn Profile Auditing & Feedback Report");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](63, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](64, "5 Mock Technical Interviews");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](65, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](66, "5 Mock HR Interviews");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](67, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](68, "Compressive and Detailed Interview Feedback Review Report");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](69, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](70, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PricingComponent_Template_button_click_70_listener() { return ctx.gotoPaymentModule(ctx.pkg.PREMIUM, ctx.premiumCost); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](71, "Buy Now");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](72, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](73, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](74);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u20B9", ctx.primaryCost, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](32);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.premiumCost);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.paidUserText, " ");
    } }, styles: ["section[_ngcontent-%COMP%] {\r\n    padding: 60px 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.section-bg[_ngcontent-%COMP%] {\r\n    background-color: #f7fbfe;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    padding-bottom: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    font-size: 32px;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n    position: relative;\r\n    color: #222222;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before, .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\r\n    margin: 0 15px 10px 0;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    margin: 0 0 10px 15px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin: 15px 0 0 0;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n    background: #f9f9f9;\r\n    text-align: center;\r\n    border-radius: 8px;\r\n    position: relative;\r\n    overflow: hidden;\r\n    border: 2px solid #f9f9f9;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n    font-weight: 400;\r\n    padding: 15px;\r\n    margin-top: 15px;\r\n    font-size: 18px;\r\n    font-weight: 600;\r\n    color: #222222;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\r\n    font-size: 42px;\r\n    color: #f0ab18;\r\n    font-weight: 500;\r\n    font-family: \"Open Sans\", sans-serif;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   sup[_ngcontent-%COMP%] {\r\n    font-size: 20px;\r\n    top: -15px;\r\n    left: -3px;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    color: #bababa;\r\n    font-size: 16px;\r\n    font-weight: 300;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\r\n    padding: 0;\r\n    list-style: none;\r\n    color: #222222;\r\n    text-align: center;\r\n    line-height: 20px;\r\n    font-size: 14px;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n    padding-bottom: 16px;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n    color: #f0ab18;\r\n    font-size: 18px;\r\n    padding-right: 4px;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   .na[_ngcontent-%COMP%] {\r\n    color: #ccc;\r\n    text-decoration: line-through;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .btn-wrap[_ngcontent-%COMP%] {\r\n    padding: 15px;\r\n    text-align: center;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .btn-buy[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    padding: 10px 40px 12px 40px;\r\n    border-radius: 50px;\r\n    border: 2px solid #f0ab18;\r\n    color: #f0ab18;\r\n    font-size: 14px;\r\n    font-weight: 400;\r\n    font-family: \"Raleway\", sans-serif;\r\n    font-weight: 600;\r\n    transition: 0.3s;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .btn-buy[_ngcontent-%COMP%]:hover {\r\n    background: #f0ab18;\r\n    color: #fff;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .recommended[_ngcontent-%COMP%] {\r\n    border-color: #f0ab18;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .recommended[_ngcontent-%COMP%]   .btn-buy[_ngcontent-%COMP%] {\r\n    background: #f0ab18;\r\n    color: #fff;\r\n}\r\n\r\n.pricing[_ngcontent-%COMP%]   .recommended[_ngcontent-%COMP%]   .btn-buy[_ngcontent-%COMP%]:hover {\r\n    background: #2383c4;\r\n    border-color: #2383c4;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9wcmljaW5nL3ByaWNpbmcuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsa0JBQWtCO0lBQ2xCLGNBQWM7QUFDbEI7O0FBRUE7O0lBRUksV0FBVztJQUNYLFdBQVc7SUFDWCxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFJQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLG9DQUFvQztJQUNwQyxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsVUFBVTtJQUNWLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGNBQWM7SUFDZCxlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksY0FBYztJQUNkLGVBQWU7SUFDZixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQiw0QkFBNEI7SUFDNUIsbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixjQUFjO0lBQ2QsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixrQ0FBa0M7SUFDbEMsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsV0FBVztBQUNmOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLHFCQUFxQjtBQUN6QiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvcHJpY2luZy9wcmljaW5nLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJzZWN0aW9uIHtcclxuICAgIHBhZGRpbmc6IDYwcHggMDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5zZWN0aW9uLWJnIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2ZiZmU7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMiB7XHJcbiAgICBmb250LXNpemU6IDMycHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBjb2xvcjogIzIyMjIyMjtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDI6OmJlZm9yZSxcclxuLnNlY3Rpb24tdGl0bGUgaDI6OmFmdGVyIHtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDJweDtcclxuICAgIGJhY2tncm91bmQ6ICNmMGFiMTg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjpiZWZvcmUge1xyXG4gICAgbWFyZ2luOiAwIDE1cHggMTBweCAwO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YWZ0ZXIge1xyXG4gICAgbWFyZ2luOiAwIDAgMTBweCAxNXB4O1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBwIHtcclxuICAgIG1hcmdpbjogMTVweCAwIDAgMDtcclxufVxyXG5cclxuXHJcblxyXG4ucHJpY2luZyAuYm94IHtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjlmOWY5O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNmOWY5Zjk7XHJcbn1cclxuXHJcbi5wcmljaW5nIC5ib3ggaDMge1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjMjIyMjIyO1xyXG59XHJcblxyXG4ucHJpY2luZyAuYm94IGg0IHtcclxuICAgIGZvbnQtc2l6ZTogNDJweDtcclxuICAgIGNvbG9yOiAjZjBhYjE4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGZvbnQtZmFtaWx5OiBcIk9wZW4gU2Fuc1wiLCBzYW5zLXNlcmlmO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLnByaWNpbmcgLmJveCBoNCBzdXAge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgdG9wOiAtMTVweDtcclxuICAgIGxlZnQ6IC0zcHg7XHJcbn1cclxuXHJcbi5wcmljaW5nIC5ib3ggaDQgc3BhbiB7XHJcbiAgICBjb2xvcjogI2JhYmFiYTtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbn1cclxuXHJcbi5wcmljaW5nIC5ib3ggdWwge1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICBjb2xvcjogIzIyMjIyMjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4ucHJpY2luZyAuYm94IHVsIGxpIHtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxNnB4O1xyXG59XHJcblxyXG4ucHJpY2luZyAuYm94IHVsIGkge1xyXG4gICAgY29sb3I6ICNmMGFiMTg7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiA0cHg7XHJcbn1cclxuXHJcbi5wcmljaW5nIC5ib3ggdWwgLm5hIHtcclxuICAgIGNvbG9yOiAjY2NjO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XHJcbn1cclxuXHJcbi5wcmljaW5nIC5ib3ggLmJ0bi13cmFwIHtcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5wcmljaW5nIC5ib3ggLmJ0bi1idXkge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcGFkZGluZzogMTBweCA0MHB4IDEycHggNDBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjZjBhYjE4O1xyXG4gICAgY29sb3I6ICNmMGFiMTg7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgZm9udC1mYW1pbHk6IFwiUmFsZXdheVwiLCBzYW5zLXNlcmlmO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIHRyYW5zaXRpb246IDAuM3M7XHJcbn1cclxuXHJcbi5wcmljaW5nIC5ib3ggLmJ0bi1idXk6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG4ucHJpY2luZyAucmVjb21tZW5kZWQge1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjZjBhYjE4O1xyXG59XHJcblxyXG4ucHJpY2luZyAucmVjb21tZW5kZWQgLmJ0bi1idXkge1xyXG4gICAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG4ucHJpY2luZyAucmVjb21tZW5kZWQgLmJ0bi1idXk6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogIzIzODNjNDtcclxuICAgIGJvcmRlci1jb2xvcjogIzIzODNjNDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](PricingComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-pricing',
                templateUrl: './pricing.component.html',
                styleUrls: ['./pricing.component.css']
            }]
    }], function () { return [{ type: _util_util_service__WEBPACK_IMPORTED_MODULE_4__["UtilService"] }, { type: src_app_component_authentication_payment_service__WEBPACK_IMPORTED_MODULE_5__["PaymentService"] }, { type: _component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialog"] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "1Wpv":
/*!**********************************************************************************!*\
  !*** ./src/app/pageComponent/company/privacy-policy/privacy-policy.component.ts ***!
  \**********************************************************************************/
/*! exports provided: PrivacyPolicyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivacyPolicyComponent", function() { return PrivacyPolicyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PrivacyPolicyComponent {
    constructor() { }
    ngOnInit() {
    }
}
PrivacyPolicyComponent.ɵfac = function PrivacyPolicyComponent_Factory(t) { return new (t || PrivacyPolicyComponent)(); };
PrivacyPolicyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PrivacyPolicyComponent, selectors: [["app-privacy-policy"]], decls: 117, vars: 0, consts: [[1, "inner-page"], [1, "container", "mainDiv"], ["data-aos", "fade-up", 1, "section-title"], [2, "color", "black"], ["href", "#"], [2, "list-style-type", "disc"], [1, "container"], [1, "row"], [1, "col-md-2"]], template: function PrivacyPolicyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Privacy Policy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "strong", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "u");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Who are we?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "We are Avyukt Edutech Pvt. Ltd., India\u2019s first and only skill based Digital Learning platform, providing training and guidance to engineering students and aspirants of the Core and non-IT industries. We provide services under various engineering fields such as mechanical, electrical, civil, chemical, metallurgy, bio-tech.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " With 500+ video lectures, 50+ passionate IE\u2019s and 2000+ interested students waiting for the portal to go live, we are bound to value your trust. In order to safeguard your trust and all other personal information you have surrendered with us, we follow certain ethical standards.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " We think it is necessary for you to read our Privacy Policy carefully to understand what we do. Please feel free to contact us at ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "privacy@ninthsem.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " if you do not understand any aspect of this document");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "strong", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "u");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "What information do we collect?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Some parts and bits of our website may be viewed without revealing any personal details. However, in order to avail our services like virtual industrial tours, mock interviews, CV building sessions and many more, you will have to mention information like,");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "ul", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "your name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "email address");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "IP address");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "contact number");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "passwords");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "transaction and payment details");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, " We would like to mention that you are yourself responsible for the accuracy of your personal information.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, " We will at all times provide you with a disclaimer and you can further withdraw yourself from providing any personal information. At any time, in future, you can also write to us to withdraw your consent. Upon reviewing your application, we may delete all or some of your information.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "strong", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "u");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "How we use the information?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "We may examine how you visit and use our website, only for building a higher quality service platform and only for the purpose of conducting a statistical analysis. In no other way, we aim at disclosing your personal information. We use the information provided, only for you to render services so provided on our website.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, " We will further use it for providing technical support to you and to send updates regarding new offers and courses.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, " Our website provides you with the option to pay for services using credit/debit cards and other net banking methods. Such service is provided by an individual third party and not us, which must be noted.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, " We are bound to share your personal information with various Government Authorities in response to court orders or any other legal obligation. We may use it to enforce and update your ToU and also investigate violations, if any. We may use it, if we feel it is necessary to protect the property or safety of our website");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "strong", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "u");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "Complete and thorough access to your personal information:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "We will provide you with means and medium to ensure that the information is correct and accurate. We will direct you to change or correct your personal information. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "strong", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "u");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Cookies: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, "Cookies are inherent small files sent to your device as and when you try to register with us. The only purpose of cookies is to make your browsing worthwhile and help us to track your area of interest.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, " You can, at any point reset your browser to refuse all cookies.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, " However, it must be noted that some of our services may not work efficiently if your cookies are disabled. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "strong", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "u");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "For how long we will store your data? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, "We have already mentioned what and how your data will be stored. From the time your account is active and functioning and from then onwards, for a period of 2 years, your data will be stored. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "strong", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "u");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "Amendment to this policy:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](88, "The nature of internet and how digitally equipped an e-learning platform ought to be, we will keep amending our privacy policy. You are requested to review this part of our website after regular intervals for any changes. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, " By registering to our website and after reading our Privacy Policy, you are expressly consenting to its collection, storing, processing and handling.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](93, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](94, " For any grievance or query, reach out us.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](98, "Registered Address:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](100, " Avyukt Edutech Pvt. Ltd.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](101, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](102, " 404 Ashok Vatika");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](104, " Chakeisiani, Bhubaneswar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](108, "E-mail ID:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](110, " contact@ninthsem.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](114, "Contact No:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](116, "+91 9437 855 859 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["section[_ngcontent-%COMP%] {\r\n    padding: 60px 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.section-bg[_ngcontent-%COMP%] {\r\n    background-color: #f7fbfe;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    padding-bottom: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    font-size: 32px;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n    position: relative;\r\n    color: #222222;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before, .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\r\n    margin: 0 15px 10px 0;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    margin: 0 0 10px 15px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin: 15px 0 0 0;\r\n}\r\n\r\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], b[_ngcontent-%COMP%]{\r\n    font-family: \"Raleway\", sans-serif;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    margin-bottom: 0px !important;\r\n}\r\n\r\n.mainDiv[_ngcontent-%COMP%]{\r\n    height: 50rem;\r\n    overflow-y: scroll;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9jb21wYW55L3ByaXZhY3ktcG9saWN5L3ByaXZhY3ktcG9saWN5LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLHlCQUF5QjtJQUN6QixrQkFBa0I7SUFDbEIsY0FBYztBQUNsQjs7QUFFQTs7SUFFSSxXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksNkJBQTZCO0FBQ2pDOztBQUNBO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtBQUN0QiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvY29tcGFueS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbnNlY3Rpb24ge1xyXG4gICAgcGFkZGluZzogNjBweCAwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLnNlY3Rpb24tYmcge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZmJmZTtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDMwcHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyIHtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGNvbG9yOiAjMjIyMjIyO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YmVmb3JlLFxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YWZ0ZXIge1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIGhlaWdodDogMnB4O1xyXG4gICAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDI6OmJlZm9yZSB7XHJcbiAgICBtYXJnaW46IDAgMTVweCAxMHB4IDA7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjphZnRlciB7XHJcbiAgICBtYXJnaW46IDAgMCAxMHB4IDE1cHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIHAge1xyXG4gICAgbWFyZ2luOiAxNXB4IDAgMCAwO1xyXG59XHJcblxyXG5oMSxoMixoMyxoNCxoNSxoNixie1xyXG4gICAgZm9udC1mYW1pbHk6IFwiUmFsZXdheVwiLCBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDtcclxufVxyXG4ubWFpbkRpdntcclxuICAgIGhlaWdodDogNTByZW07XHJcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PrivacyPolicyComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-privacy-policy',
                templateUrl: './privacy-policy.component.html',
                styleUrls: ['./privacy-policy.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "4eZQ":
/*!*********************************************************************!*\
  !*** ./src/app/component/authentication/signup/signup.component.ts ***!
  \*********************************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../login/login.component */ "U5be");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enum */ "v6DW");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../auth.service */ "ddlN");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/flex-layout/extended */ "znSr");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _enumkeyvalue_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../enumkeyvalue.pipe */ "a+px");

















function SignupComponent_mat_spinner_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-spinner");
} }
function SignupComponent_div_2_div_2_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Please Enter User Name !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Please Enter First Name !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Please Enter Last Name !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_25_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Email is required !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_25_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Please Enter Valid Email !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, SignupComponent_div_2_div_2_div_25_div_1_Template, 2, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, SignupComponent_div_2_div_2_div_25_div_2_Template, 2, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r7.form.get("email").errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r7.form.get("email").errors.email);
} }
function SignupComponent_div_2_div_2_div_28_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Please Enter Password !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_28_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Password Should be min 8 Digits !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, SignupComponent_div_2_div_2_div_28_div_1_Template, 2, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, SignupComponent_div_2_div_2_div_28_div_2_Template, 2, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r8.form.get("password").errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r8.form.get("password").errors.minlength);
} }
function SignupComponent_div_2_div_2_div_31_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Please Enter Mobile Number !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_31_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Number Should be 10 Digits !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, SignupComponent_div_2_div_2_div_31_div_1_Template, 2, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, SignupComponent_div_2_div_2_div_31_div_2_Template, 2, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r9.form.get("mobile").errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r9.form.get("mobile").errors.min);
} }
function SignupComponent_div_2_div_2_option_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const c_r22 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("value", c_r22.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](c_r22.key);
} }
function SignupComponent_div_2_div_2_div_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Please Select Course !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_option_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const b_r23 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("value", b_r23.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](b_r23.key);
} }
function SignupComponent_div_2_div_2_div_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Please Select Branch !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_48_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Please Enter GradutionYear !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_48_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Graduation Year should have 4 Digits !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_48_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Graduation Year should have 4 Digits !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_div_2_div_2_div_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, SignupComponent_div_2_div_2_div_48_div_1_Template, 2, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, SignupComponent_div_2_div_2_div_48_div_2_Template, 2, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, SignupComponent_div_2_div_2_div_48_div_3_Template, 2, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r14.form.get("graduationYear").errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r14.form.get("graduationYear").errors.min);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r14.form.get("graduationYear").errors.max);
} }
function SignupComponent_div_2_div_2_div_51_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Please Enter Your College Name !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
const _c0 = function (a0) { return { "is-invalid": a0 }; };
function SignupComponent_div_2_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "clear");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "h2", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Signup");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "form", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("submit", function SignupComponent_div_2_div_2_Template_form_submit_13_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r27.onSignup(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, SignupComponent_div_2_div_2_div_16_Template, 3, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, SignupComponent_div_2_div_2_div_19_Template, 3, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](21, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, SignupComponent_div_2_div_2_div_22_Template, 3, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](24, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, SignupComponent_div_2_div_2_div_25_Template, 3, 2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](27, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, SignupComponent_div_2_div_2_div_28_Template, 3, 2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](30, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, SignupComponent_div_2_div_2_div_31_Template, 3, 2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "select", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](35, "Select course");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](36, SignupComponent_div_2_div_2_option_36_Template, 2, 2, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](37, "enumKeyValue");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](38, SignupComponent_div_2_div_2_div_38_Template, 3, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "select", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42, "Select Branch");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](43, SignupComponent_div_2_div_2_option_43_Template, 2, 2, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](44, "enumKeyValue");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](45, SignupComponent_div_2_div_2_div_45_Template, 3, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](47, "input", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](48, SignupComponent_div_2_div_2_div_48_Template, 4, 3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](50, "input", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](51, SignupComponent_div_2_div_2_div_51_Template, 3, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](53, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](55, "Submit");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](57, "Already have an account ? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](58, "a", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SignupComponent_div_2_div_2_Template_a_click_58_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28); const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r29.Login(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](59, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r3.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](30, _c0, ctx_r3.form.get("userName").touched && ctx_r3.form.get("userName").invalid));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.form.get("userName").touched && ctx_r3.form.get("userName").invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](32, _c0, ctx_r3.form.get("firstName").touched && ctx_r3.form.get("firstName").invalid));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.form.get("firstName").touched && ctx_r3.form.get("firstName").invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](34, _c0, ctx_r3.form.get("lastName").touched && ctx_r3.form.get("lastName").invalid));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.form.get("lastName").touched && ctx_r3.form.get("lastName").invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](36, _c0, ctx_r3.form.get("email").touched && ctx_r3.form.get("email").invalid));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.form.get("email").touched && ctx_r3.form.get("email").invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](38, _c0, ctx_r3.form.get("password").touched && ctx_r3.form.get("password").invalid));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.form.get("password").touched && ctx_r3.form.get("password").invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](40, _c0, ctx_r3.form.get("mobile").touched && ctx_r3.form.get("mobile").invalid));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.form.get("mobile").touched && ctx_r3.form.get("mobile").invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](42, _c0, ctx_r3.form.get("course").touched && ctx_r3.form.get("course").invalid));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngValue", null);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](37, 26, ctx_r3.courses));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.form.get("course").touched && ctx_r3.form.get("course").invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](44, _c0, ctx_r3.form.get("branch").touched && ctx_r3.form.get("branch").invalid));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngValue", null);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](44, 28, ctx_r3.branches));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.form.get("branch").touched && ctx_r3.form.get("branch").invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](46, _c0, ctx_r3.form.get("graduationYear").touched && ctx_r3.form.get("graduationYear").invalid));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.form.get("graduationYear").touched && ctx_r3.form.get("graduationYear").invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](48, _c0, ctx_r3.form.get("college").touched && ctx_r3.form.get("college").invalid));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.form.get("college").touched && ctx_r3.form.get("college").invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx_r3.form.valid);
} }
function SignupComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, SignupComponent_div_2_div_2_Template, 60, 50, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.signupSuccess);
} }
function SignupComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Congratulations! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "h1", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Your account has been created Successfully.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class SignupComponent {
    constructor(matDialog, authService, utilService, router) {
        this.matDialog = matDialog;
        this.authService = authService;
        this.utilService = utilService;
        this.router = router;
        this.hide = true;
        this.signVisible = true;
        this.signupSuccess = false;
        this.isVerified = false;
        this.branches = _enum__WEBPACK_IMPORTED_MODULE_3__["Branch"];
        this.ShortBranch = _enum__WEBPACK_IMPORTED_MODULE_3__["BranchShortForm"];
        this.courses = _enum__WEBPACK_IMPORTED_MODULE_3__["Course"];
    }
    ngOnInit() {
        this.utilService.ScrollToTop();
        this.sm = _enum__WEBPACK_IMPORTED_MODULE_3__["SocialMediaTerms"];
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            // image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
            userName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required] }),
            firstName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required] }),
            lastName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required] }),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8)] }),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email] }),
            mobile: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(999999999)] }),
            branch: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required] }),
            course: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required] }),
            graduationYear: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(999)] }),
            college: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required] }),
            refferalCode: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null)
        });
        this.signupSuccess = this.authService.getSignupStatus();
        // this.isLoading = false
        this.utilService.setLoaderStatus(false);
        this.signupStatusListener = this.authService.getSignupStatusListener().subscribe(isSignedUp => {
            // this.isLoading = false,
            this.utilService.setLoaderStatus(false);
            this.signupSuccess = isSignedUp;
        });
    }
    onSignup() {
        if (this.form.invalid) {
            return;
        }
        else {
            this.authService.createUser(
            // this.form.value.image,
            this.form.value.userName, this.form.value.firstName, this.form.value.lastName, this.form.value.password, this.form.value.email, this.form.value.mobile, this.form.value.branch, this.form.value.course, this.form.value.graduationYear, this.form.value.college, this.form.value.refferalCode);
            this.signVisible = false;
            this.utilService.setLoaderStatus(true);
            // this.isLoading = true;
            this.isVerified = true;
        }
    }
    Login() {
        this.matDialog.open(_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"]);
        this.signVisible = false;
    }
    onImagePicked(event) {
        const file = event.target.files[0];
        this.form.patchValue({ image: file });
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }
    openSocialMedia(type) {
        return this.utilService.openSocialMedia(type);
    }
    getLoaderStatus() {
        return this.utilService.getLoaderStatus();
    }
}
SignupComponent.ɵfac = function SignupComponent_Factory(t) { return new (t || SignupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_6__["UtilService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"])); };
SignupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: SignupComponent, selectors: [["app-signup"]], decls: 4, vars: 3, consts: [[4, "ngIf"], ["class", "notification", 4, "ngIf"], ["data-aos", "zoom-in-up", 1, "dialogContent"], ["class", "container ", "mat-dialog-content", "", "style", "background-image: url(/assets/images/signup-image.png);", 4, "ngIf"], ["mat-dialog-content", "", 1, "container", 2, "background-image", "url(/assets/images/signup-image.png)"], [1, "container"], [1, "d-flex", "flex-row-reverse"], ["mat-dialog-close", "", "align", "end", 2, "color", "white", "background", "#384545", "margin-top", "20px"], [1, "row"], [1, "col-6", 2, "text-align", "center"], [1, "ninthsem_logo"], ["src", "assets/images/profile.png", 1, "rounded", "mx-auto", "d-block", 2, "width", "25%"], [1, "heading3", 2, "text-align", "center"], [3, "formGroup", "submit"], [1, "form-group"], ["type", "text", "id", "exampleInputEmail1", "formControlName", "userName", "placeholder", "Username", 1, "form-control", 3, "ngClass"], ["class", "invalid-feedback", 4, "ngIf"], ["type", "text", "id", "exampleInputEmail1", "formControlName", "firstName", "placeholder", "First name", 1, "form-control", 3, "ngClass"], ["type", "text", "id", "exampleInputEmail1", "formControlName", "lastName", "placeholder", "Last name", 1, "form-control", 3, "ngClass"], ["type", "email", "id", "exampleInputEmail1", "formControlName", "email", "placeholder", "Email", 1, "form-control", 3, "ngClass"], ["type", "password", "id", "exampleInputPassword1", "formControlName", "password", "placeholder", "Password", 1, "form-control", 3, "ngClass"], ["type", "tel", "id", "exampleInputEmail1", "formControlName", "mobile", "placeholder", "Phone number", "maxlength", "10", 1, "form-control", 3, "ngClass"], ["formControlName", "course", 1, "form-control", 3, "ngClass"], ["disabled", "", 3, "ngValue"], ["required", "", 3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "branch", "placeholder", "Select Branch", 1, "form-control", 3, "ngClass"], ["type", "number", "id", "exampleInputEmail1", "formControlName", "graduationYear", "placeholder", "Enter graduation year", 1, "form-control", 3, "ngClass"], ["type", "text", "id", "exampleInputEmail1", "formControlName", "college", "placeholder", "Name of university/College", 1, "form-control", 3, "ngClass"], ["type", "text", "id", "exampleInputEmail1", "formControlName", "refferalCode", "placeholder", "Referral code", 1, "form-control"], ["id", "btn1", 2, "padding", "1.375rem 3.75rem !important", 3, "disabled"], ["mat-dialog-close", "", "cdkFocusInitial", "", 2, "color", "white", "background", "#384545 !important", "border-radius", "5px", 3, "click"], [1, "invalid-feedback"], ["required", "", 3, "value"], [1, "notification"], ["src", "/assets/images/ninthsemlogo.png", "alt", "img", 1, "align-center"], ["mat-dialog-title", "", 2, "margin", "25px 15px 16px 25px"], ["mat-dialog-title", ""], ["mat-dialog-actions", ""], ["mat-button", "", "mat-dialog-close", ""]], template: function SignupComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, SignupComponent_mat_spinner_1_Template, 1, 0, "mat-spinner", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, SignupComponent_div_2_Template, 3, 1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, SignupComponent_div_3_Template, 9, 0, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.getLoaderStatus());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.getLoaderStatus());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.signupSuccess);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__["MatSpinner"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogContent"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIcon"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogClose"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgClass"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_11__["DefaultClassDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NumberValueAccessor"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButton"]], pipes: [_enumkeyvalue_pipe__WEBPACK_IMPORTED_MODULE_13__["EnumKeyValuePipe"]], styles: [".mat-dialog-content {\n  overflow-x: hidden;\n  margin: auto;\n}\n.heading2[_ngcontent-%COMP%] {\n  color: #4C4C4C;\n  font-family: \"Poppins\", poppins;\n  font-size: 20px;\n  font-weight: 400;\n  line-height: 1.3em;\n}\n.dialogContent[_ngcontent-%COMP%] {\n  background-image: linear-gradient(to right, #e4eded, #747a7a) !important;\n}\n.container[_ngcontent-%COMP%] {\n  width: auto;\n  height: auto;\n  \n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.notification[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-height: 5rem;\n  max-width: 16rem;\n}\n.heading3[_ngcontent-%COMP%] {\n  color: #4C4C4C;\n  font-family: \"Poppins\", poppins;\n  font-size: 20px;\n  font-weight: 800;\n  line-height: 1.3em;\n}\n.heading[_ngcontent-%COMP%] {\n  color: #4C4C4C;\n  font-family: \"Poppins\", poppins;\n  font-size: 40px;\n  font-weight: 600;\n  text-transform: capitalize;\n  line-height: 1em;\n}\n.h4[_ngcontent-%COMP%] {\n  margin-bottom: 0px;\n}\na[_ngcontent-%COMP%] {\n  width: 5rem;\n}\n#btn1[_ngcontent-%COMP%] {\n  background-color: black;\n  color: white;\n  border-radius: 5px;\n}\n.cancelBtn[_ngcontent-%COMP%] {\n  float: right;\n  margin-top: 20px;\n}\n.myauto[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  margin-bottom: 30px;\n}\n#butn[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n}\n.ninthsem_logo[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n@media (min-width: 1200px) {\n  .container[_ngcontent-%COMP%] {\n    \n    \n  }\n}\n.social-links[_ngcontent-%COMP%] {\n  padding-bottom: 20px;\n  padding-top: 10px;\n}\n.social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 18px;\n  display: inline-block;\n  background: #fff;\n  color: #f0ab18;\n  line-height: 1;\n  padding: 8px 0;\n  margin-right: 4px;\n  border-radius: 50%;\n  text-align: center;\n  width: 36px;\n  height: 36px;\n  transition: 0.3s;\n  border: 1px solid #f0ab18;\n}\n.social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background: #f0ab18;\n  color: #fff;\n}\na[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.follow-us[_ngcontent-%COMP%] {\n  color: #4C4C4C;\n  font-family: \"Poppins\", poppins;\n  font-size: 18px;\n  font-weight: 600;\n  text-transform: capitalize;\n  line-height: 1em;\n}\n.form-control[_ngcontent-%COMP%] {\n  height: calc(2.5em + .75rem + 2px) !important;\n  font-size: 1.3rem !important;\n}\n.notification[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-height: 5rem;\n  max-width: 16rem;\n}\n@media (max-width: 600px) {\n  .row[_ngcontent-%COMP%] {\n    position: relative;\n    margin-left: -12rem;\n  }\n\n  .form-control[_ngcontent-%COMP%] {\n    min-width: 210px;\n  }\n\n  h3[_ngcontent-%COMP%] {\n    min-width: 200px;\n  }\n\n  .ninthsem_logo[_ngcontent-%COMP%] {\n    margin-left: 80px;\n    width: 60px;\n    height: auto;\n  }\n\n  h2[_ngcontent-%COMP%] {\n    margin-left: 80px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL3NpZ251cC9zaWdudXAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSxrQkFBQTtFQUNBLFlBQUE7QUFBSjtBQU1BO0VBQ0UsY0FBQTtFQUNBLCtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFKRjtBQU1BO0VBRUUsd0VBQUE7QUFKRjtBQU1BO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFFQSxrQkFBQTtBQUpGO0FBT0E7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUpGO0FBTUE7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0FBSEY7QUFRQTtFQUNFLGNBQUE7RUFDQSwrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBTEY7QUFRQTtFQUNFLGNBQUE7RUFDQSwrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0VBQ0EsZ0JBQUE7QUFMRjtBQVFBO0VBQ0Usa0JBQUE7QUFMRjtBQU9BO0VBQ0UsV0FBQTtBQUpGO0FBUUU7RUFDRSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQUxKO0FBT0U7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUFKSjtBQU1FO0VBQ0MsZ0JBQUE7RUFDQSxtQkFBQTtBQUhIO0FBS0E7RUFDRSxtQkFBQTtBQUZGO0FBS0E7RUFDRSxtQkFBQTtBQUZGO0FBUUU7RUFDRTtJQUNFLGtCQUFBO0lBQ0Msc0JBQUE7RUFMTDtBQUNGO0FBT0E7RUFDRSxvQkFBQTtFQUNBLGlCQUFBO0FBTEY7QUFRQTtFQUNFLGVBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0FBTEY7QUFRQTtFQUNFLG1CQUFBO0VBQ0EsV0FBQTtBQUxGO0FBT0E7RUFDRSxlQUFBO0FBSkY7QUFNQTtFQUNFLGNBQUE7RUFDRSwrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0VBQ0EsZ0JBQUE7QUFISjtBQVFBO0VBQ0UsNkNBQUE7RUFDQSw0QkFBQTtBQUxGO0FBU0M7RUFDRyxnQkFBQTtFQUNBLGdCQUFBO0FBTko7QUFRRTtFQUNFO0lBQ0Usa0JBQUE7SUFDQSxtQkFBQTtFQUxKOztFQVNGO0lBQ00sZ0JBQUE7RUFOSjs7RUFTQTtJQUNBLGdCQUFBO0VBTkE7O0VBUUE7SUFDRSxpQkFBQTtJQUNBLFdBQUE7SUFDQSxZQUFBO0VBTEY7O0VBUUE7SUFDRSxpQkFBQTtFQUxGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvYXV0aGVudGljYXRpb24vc2lnbnVwL3NpZ251cC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjo6bmctZGVlcCB7XHJcbiAgLm1hdC1kaWFsb2ctY29udGVudCB7XHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgfVxyXG4gIC5tYXQtZGlhbG9nLWNvbnRhaW5lciB7XHJcbiAgICAvLyBwYWRkaW5nOiB1bnNldCAhaW1wb3J0YW50O1xyXG4gIH0gIFxyXG59XHJcbi5oZWFkaW5nMiB7XHJcbiAgY29sb3I6ICM0QzRDNEM7XHJcbiAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiLCBwb3BwaW5zO1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjNlbTtcclxufVxyXG4uZGlhbG9nQ29udGVudHtcclxuXHJcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCNlNGVkZWQgICwgIzc0N2E3YSkgIWltcG9ydGFudDtcclxufVxyXG4uY29udGFpbmVyIHtcclxuICB3aWR0aDogYXV0bztcclxuICBoZWlnaHQ6IGF1dG87XHJcblxyXG4gIC8qIG1hcmdpbjogMnJlbTsgKi9cclxufVxyXG5cclxuLnJvd3tcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLm5vdGlmaWNhdGlvbiBpbWd7XHJcbiAgbWF4LWhlaWdodDogNXJlbTtcclxuICBtYXgtd2lkdGg6IDE2cmVtO1xyXG59XHJcblxyXG5cclxuXHJcbi5oZWFkaW5nMyB7XHJcbiAgY29sb3I6ICM0QzRDNEM7XHJcbiAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiLCBwb3BwaW5zO1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBmb250LXdlaWdodDogODAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjNlbTtcclxufVxyXG5cclxuLmhlYWRpbmcge1xyXG4gIGNvbG9yOiAjNEM0QzRDO1xyXG4gIGZvbnQtZmFtaWx5OiBcIlBvcHBpbnNcIiwgcG9wcGlucztcclxuICBmb250LXNpemU6IDQwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICBsaW5lLWhlaWdodDogMWVtO1xyXG59XHJcblxyXG4uaDQge1xyXG4gIG1hcmdpbi1ib3R0b206IDBweDtcclxufVxyXG5he1xyXG4gIHdpZHRoOiA1cmVtO1xyXG5cclxufVxyXG5cclxuICAjYnRuMXtcclxuICAgIGJhY2tncm91bmQtY29sb3I6YmxhY2s7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgfVxyXG4gIC5jYW5jZWxCdG57XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gIH1cclxuICAubXlhdXRve1xyXG4gICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG4gfVxyXG4jYnV0biB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxufVxyXG5cclxuLm5pbnRoc2VtX2xvZ28ge1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiAgQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xyXG4gICAgLmNvbnRhaW5lciB7XHJcbiAgICAgIC8qIHdpZHRoOiA3MjBweDsgKi9cclxuICAgICAgIC8qIG1hcmdpbi10b3A6IDEwcHg7ICovXHJcbiAgICB9XHJcbn1cclxuLnNvY2lhbC1saW5rcyB7XHJcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XHJcbiAgcGFkZGluZy10b3A6IDEwcHg7XHJcbn1cclxuXHJcbi5zb2NpYWwtbGlua3MgYSB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIGNvbG9yOiAjZjBhYjE4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG4gIHBhZGRpbmc6IDhweCAwO1xyXG4gIG1hcmdpbi1yaWdodDogNHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDM2cHg7XHJcbiAgaGVpZ2h0OiAzNnB4O1xyXG4gIHRyYW5zaXRpb246IDAuM3M7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2YwYWIxODtcclxufVxyXG5cclxuLnNvY2lhbC1saW5rcyBhOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kOiAjZjBhYjE4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG59XHJcbmEge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4uZm9sbG93LXVzIHtcclxuICBjb2xvcjogIzRDNEM0QztcclxuICAgIGZvbnQtZmFtaWx5OiBcIlBvcHBpbnNcIiwgcG9wcGlucztcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgIGxpbmUtaGVpZ2h0OiAxZW07XHJcbn1cclxuXHJcblxyXG5cclxuLmZvcm0tY29udHJvbHtcclxuICBoZWlnaHQ6IGNhbGMoMi41ZW0gKyAuNzVyZW0gKyAycHgpICFpbXBvcnRhbnQ7XHJcbiAgZm9udC1zaXplOiAxLjNyZW0gIWltcG9ydGFudDtcclxufVxyXG5cclxuXHJcbiAubm90aWZpY2F0aW9uIGltZ3tcclxuICAgIG1heC1oZWlnaHQ6IDVyZW07XHJcbiAgICBtYXgtd2lkdGg6IDE2cmVtO1xyXG4gIH1cclxuICBAbWVkaWEgKG1heC13aWR0aDogNjAwcHgpe1xyXG4gICAgLnJvd3tcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtYXJnaW4tbGVmdDotMTJyZW0gO1xyXG4gIH1cclxuICAubG9naW5fbWFpbntcclxuICB9XHJcbi5mb3JtLWNvbnRyb2x7XHJcbiAgICAgIG1pbi13aWR0aDogMjEwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIGgze1xyXG4gIG1pbi13aWR0aDogMjAwcHg7XHJcbiAgfVxyXG4gIC5uaW50aHNlbV9sb2dve1xyXG4gICAgbWFyZ2luLWxlZnQ6IDgwcHg7XHJcbiAgICB3aWR0aDogNjBweDtcclxuICAgIGhlaWdodDogYXV0b1xyXG4gIH1cclxuIFxyXG4gIGgye1xyXG4gICAgbWFyZ2luLWxlZnQ6IDgwcHg7XHJcbiAgfVxyXG4gIH1cclxuICAiXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](SignupComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-signup',
                templateUrl: './signup.component.html',
                styleUrls: ['./signup.component.scss']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] }, { type: _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] }, { type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_6__["UtilService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] }]; }, null); })();


/***/ }),

/***/ "5XF3":
/*!**************************************************************************!*\
  !*** ./src/app/pageComponent/company/disclaimer/disclaimer.component.ts ***!
  \**************************************************************************/
/*! exports provided: DisclaimerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisclaimerComponent", function() { return DisclaimerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class DisclaimerComponent {
    constructor() { }
    ngOnInit() {
    }
}
DisclaimerComponent.ɵfac = function DisclaimerComponent_Factory(t) { return new (t || DisclaimerComponent)(); };
DisclaimerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DisclaimerComponent, selectors: [["app-disclaimer"]], decls: 47, vars: 0, consts: [["id", "exampleModalCenter"], [1, "inner-page"], ["mat-dialog-content", "", 1, "container", "mainDiv"], [1, "d-flex", "flex-row-reverse"], ["data-aos", "fade-up", 1, "section-title"], [1, "container"], [1, "row"], [1, "col-md-2"]], template: function DisclaimerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "section", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Disclaimer Policy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "We are a passionate team of engineers who wish to change the engineering scene in the country. As India\u2019s first and only skill based Digital Learning platform, we provide training and guidance to engineers and aspirants of the Core as well as Non-IT industries. It is important to mention that all information present on this website is general in nature and is provided by Avyukt Edutech Pvt. Ltd. We further state that the content on this website is only to impart general information and in neither way, expressly or impliedly, we guarantee the accuracy of the information so mentioned. Reliance placed by the users on such information and its exactness and rightness is purely voluntary.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Like mentioned above, we will not be liable for any damage or loss caused, either directly or consequentially by the use of our website.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " Our website consists of third party tools and advertisements and action of such third parties are outside our control. We shall not be liable for damage or loss of data caused by any such third party links.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " All necessary measures are taken by us for the smooth functioning of the website. We, at Avyukt Edutech Pvt. Ltd., are not liable for any technical issue which is beyond our control. We are not liable in circumstances where the website is temporarily unavailable due to technical botheration. We do not claim any liability related to your access to our website or the services granted. You, as the user of our website, agree voluntary, that any access to or use of services provided by us is at your own risk.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " For any queries, please contact us.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Registered Address:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, " Avyukt Edutech Pvt. Ltd.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " 404 Ashok Vatika");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, " Chakeisiani, Bhubaneswar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "E-mail ID:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, " contact@ninthsem.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Contact No:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "+91 9437 855 859 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["section[_ngcontent-%COMP%] {\r\n  padding: 60px 0;\r\n  overflow: hidden;\r\n}\r\n.cancelBtn[_ngcontent-%COMP%] {\r\n  color: white;\r\n  float: right;\r\n  margin-top: 20px;\r\n}\r\n.section-bg[_ngcontent-%COMP%] {\r\n  background-color: #f7fbfe;\r\n}\r\n.section-title[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  padding-bottom: 30px;\r\n}\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  font-size: 32px;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  position: relative;\r\n  color: #222222;\r\n}\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before, .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n  content: \"\";\r\n  width: 50px;\r\n  height: 2px;\r\n  background: #f0ab18;\r\n  display: inline-block;\r\n}\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\r\n  margin: 0 15px 10px 0;\r\n}\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n  margin: 0 0 10px 15px;\r\n}\r\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  margin: 15px 0 0 0;\r\n}\r\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], b[_ngcontent-%COMP%] {\r\n  font-family: \"Raleway\", sans-serif;\r\n}\r\nli[_ngcontent-%COMP%] {\r\n  padding-bottom: 10px;\r\n}\r\n.ull[_ngcontent-%COMP%] {\r\n  margin-left: 30px;\r\n}\r\n.section-title[_ngcontent-%COMP%] {\r\n  margin-bottom: 0px !important;\r\n}\r\n#exampleModalCenter[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n.mainDiv[_ngcontent-%COMP%] {\r\n  height: 50rem;\r\n  overflow-y: scroll;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9jb21wYW55L2Rpc2NsYWltZXIvZGlzY2xhaW1lci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLHlCQUF5QjtBQUMzQjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLG9CQUFvQjtBQUN0QjtBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQix5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLGNBQWM7QUFDaEI7QUFFQTs7RUFFRSxXQUFXO0VBQ1gsV0FBVztFQUNYLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIscUJBQXFCO0FBQ3ZCO0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7QUFFQTtFQUNFLHFCQUFxQjtBQUN2QjtBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCO0FBRUE7Ozs7Ozs7RUFPRSxrQ0FBa0M7QUFDcEM7QUFFQTtFQUNFLG9CQUFvQjtBQUN0QjtBQUVBO0VBQ0UsaUJBQWlCO0FBQ25CO0FBRUE7RUFDRSw2QkFBNkI7QUFDL0I7QUFDQTtFQUNFLFlBQVk7RUFDWixXQUFXO0FBQ2I7QUFDQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7QUFDcEIiLCJmaWxlIjoic3JjL2FwcC9wYWdlQ29tcG9uZW50L2NvbXBhbnkvZGlzY2xhaW1lci9kaXNjbGFpbWVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJzZWN0aW9uIHtcclxuICBwYWRkaW5nOiA2MHB4IDA7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG4uY2FuY2VsQnRuIHtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuLnNlY3Rpb24tYmcge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2ZiZmU7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgcGFkZGluZy1ib3R0b206IDMwcHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyIHtcclxuICBmb250LXNpemU6IDMycHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgY29sb3I6ICMyMjIyMjI7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjpiZWZvcmUsXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjphZnRlciB7XHJcbiAgY29udGVudDogXCJcIjtcclxuICB3aWR0aDogNTBweDtcclxuICBoZWlnaHQ6IDJweDtcclxuICBiYWNrZ3JvdW5kOiAjZjBhYjE4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDI6OmJlZm9yZSB7XHJcbiAgbWFyZ2luOiAwIDE1cHggMTBweCAwO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YWZ0ZXIge1xyXG4gIG1hcmdpbjogMCAwIDEwcHggMTVweDtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgcCB7XHJcbiAgbWFyZ2luOiAxNXB4IDAgMCAwO1xyXG59XHJcblxyXG5oMSxcclxuaDIsXHJcbmgzLFxyXG5oNCxcclxuaDUsXHJcbmg2LFxyXG5iIHtcclxuICBmb250LWZhbWlseTogXCJSYWxld2F5XCIsIHNhbnMtc2VyaWY7XHJcbn1cclxuXHJcbmxpIHtcclxuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLnVsbCB7XHJcbiAgbWFyZ2luLWxlZnQ6IDMwcHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIHtcclxuICBtYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDtcclxufVxyXG4jZXhhbXBsZU1vZGFsQ2VudGVyIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuLm1haW5EaXYge1xyXG4gIGhlaWdodDogNTByZW07XHJcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DisclaimerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-disclaimer',
                templateUrl: './disclaimer.component.html',
                styleUrls: ['./disclaimer.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "7yHB":
/*!***********************************!*\
  !*** ./src/app/util/page.enum.ts ***!
  \***********************************/
/*! exports provided: Page, PageRouter, ExternalURLs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Page", function() { return Page; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageRouter", function() { return PageRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalURLs", function() { return ExternalURLs; });
var Page;
(function (Page) {
    Page["COURSE_DETAILS"] = "course-detail";
    Page["VIDEO_PLAYER"] = "videoPlayer";
    Page["SIGNUP"] = "signup";
    Page["LOGIN"] = "login";
    Page["VIDEOS"] = "videos";
    Page["HOME"] = "home";
    Page["ABOUT"] = "about";
    Page["CONTACT"] = "contact";
    Page["REPORT"] = "report";
    Page["PACKAGE"] = "package";
})(Page || (Page = {}));
var PageRouter;
(function (PageRouter) {
    PageRouter["VIDEOS"] = "/videos";
    PageRouter["HOME"] = "/home";
    PageRouter["ABOUT"] = "/about";
    PageRouter["REPORT"] = "/report";
})(PageRouter || (PageRouter = {}));
var ExternalURLs;
(function (ExternalURLs) {
    ExternalURLs["BLOG"] = "https://blog.ninthsem.com/";
    ExternalURLs["PAYMENT"] = "https://firebasestorage.googleapis.com/v0/b/ninthsem-a86d3.appspot.com/o/Pages%2FpaymentDemo.html?alt=media&token=a7bd5a80-32c6-4f4f-b506-4d6119f5149a";
    ExternalURLs["TWITTER"] = "https://twitter.com/ninthsem";
    ExternalURLs["FACEBOOK"] = "https://www.facebook.com/ninthsem";
    ExternalURLs["INSTAGRAM"] = "https://www.instagram.com/ninthsem/";
    ExternalURLs["LINKEDIN"] = "https://www.linkedin.com/company/ninthsem/";
    ExternalURLs["YOUTUBE"] = "https://www.youtube.com/channel/UCdDXnt_qe4SzvQwhdyZ1EfQ";
    ExternalURLs["BROCHURE"] = "https://drive.google.com/file/d/1xi56mdkbgBIAUJFzdfR6CL1JuxUPvE7d/view";
    ExternalURLs["JOINUS"] = "http://ninthsem.net/ca/#home";
    ExternalURLs["EXPERT"] = "http://experts.ninthsem.com";
    ExternalURLs["QMECH"] = "";
    ExternalURLs["QELECTRICAL"] = "";
})(ExternalURLs || (ExternalURLs = {}));


/***/ }),

/***/ "8O3K":
/*!*******************************************************************************!*\
  !*** ./src/app/component/authentication/success-msg/success-msg.component.ts ***!
  \*******************************************************************************/
/*! exports provided: SuccessMsgComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessMsgComponent", function() { return SuccessMsgComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth.service */ "ddlN");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");








function SuccessMsgComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Password Changed Successfully !");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SuccessMsgComponent_div_0_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.close(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class SuccessMsgComponent {
    constructor(authService, data, router) {
        this.authService = authService;
        this.data = data;
        this.router = router;
        this.passChanged = false;
        this.userIsAuthenticated = false;
    }
    ngOnInit() {
        this.authService.getResponseMsg();
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusListener = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => this.userIsAuthenticated = isAuthenticated);
        this.passChanged = this.authService.getChangePassword();
        this.passStatusListener = this.authService.getPassChangeStatus().subscribe(isChanged => {
            this.passChanged = isChanged;
        });
    }
    close() {
        this.router.navigate(['/']);
    }
}
SuccessMsgComponent.ɵfac = function SuccessMsgComponent_Factory(t) { return new (t || SuccessMsgComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
SuccessMsgComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SuccessMsgComponent, selectors: [["app-success-msg"]], decls: 1, vars: 1, consts: [[4, "ngIf"], ["src", "/assets/images/ninthsemlogo.png", "alt", "img", 1, "align-center"], ["mat-dialog-title", ""], ["mat-dialog-actions", ""], ["mat-button", "", "mat-dialog-close", "", 3, "click"]], template: function SuccessMsgComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SuccessMsgComponent_div_0_Template, 7, 0, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.passChanged);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], styles: ["img[_ngcontent-%COMP%]{\r\n    max-height: 5rem;\r\n    max-width: 16rem;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL3N1Y2Nlc3MtbXNnL3N1Y2Nlc3MtbXNnLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGdCQUFnQjtFQUNsQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9hdXRoZW50aWNhdGlvbi9zdWNjZXNzLW1zZy9zdWNjZXNzLW1zZy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltZ3tcclxuICAgIG1heC1oZWlnaHQ6IDVyZW07XHJcbiAgICBtYXgtd2lkdGg6IDE2cmVtO1xyXG4gIH1cclxuICAiXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SuccessMsgComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-success-msg',
                templateUrl: './success-msg.component.html',
                styleUrls: ['./success-msg.component.css']
            }]
    }], function () { return [{ type: _auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "8dd4":
/*!*****************************************************************************!*\
  !*** ./src/app/component/authentication/logout-msg/logout-msg.component.ts ***!
  \*****************************************************************************/
/*! exports provided: LogoutMsgComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogoutMsgComponent", function() { return LogoutMsgComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");




class LogoutMsgComponent {
    constructor() { }
    ngOnInit() {
    }
}
LogoutMsgComponent.ɵfac = function LogoutMsgComponent_Factory(t) { return new (t || LogoutMsgComponent)(); };
LogoutMsgComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LogoutMsgComponent, selectors: [["app-logout-msg"]], decls: 8, vars: 0, consts: [["src", "/assets/images/ninthsemlogo.png", "alt", "img", 1, "align-center"], ["mat-dialog-title", ""], ["mat-dialog-content", ""], ["mat-dialog-actions", ""], ["mat-button", "", "mat-dialog-close", ""]], template: function LogoutMsgComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Successful !");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Successfully Signed-Out !");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], styles: ["img[_ngcontent-%COMP%]{\r\n    max-height: 5rem;\r\n    max-width: 16rem;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL2xvZ291dC1tc2cvbG9nb3V0LW1zZy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixnQkFBZ0I7RUFDbEIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvYXV0aGVudGljYXRpb24vbG9nb3V0LW1zZy9sb2dvdXQtbXNnLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1ne1xyXG4gICAgbWF4LWhlaWdodDogNXJlbTtcclxuICAgIG1heC13aWR0aDogMTZyZW07XHJcbiAgfVxyXG4gICJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LogoutMsgComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-logout-msg',
                templateUrl: './logout-msg.component.html',
                styleUrls: ['./logout-msg.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "8vpz":
/*!************************************************************!*\
  !*** ./src/app/pageComponent/contact/contact.component.ts ***!
  \************************************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_component_authentication_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/component/authentication/enum */ "v6DW");
/* harmony import */ var _util_util_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../util/util.service */ "izIa");
/* harmony import */ var src_app_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/component/authentication/auth.service */ "ddlN");
/* harmony import */ var _component_header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/header/header.component */ "Pk+G");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../component/footer/footer.component */ "xb3B");








class ContactComponent {
    constructor(utilService, authService) {
        this.utilService = utilService;
        this.authService = authService;
    }
    ngOnInit() {
        this.sm = src_app_component_authentication_enum__WEBPACK_IMPORTED_MODULE_1__["SocialMediaTerms"];
    }
    openSocialMedia(type) {
        return this.utilService.openSocialMedia(type);
    }
    Submit(form) {
        if (form.invalid) {
            return;
        }
        else {
            this.authService.contactUs(form.value.name, form.value.email, form.value.subject, form.value.message).subscribe(response => {
                if (response.success == true) {
                    this.msg = "Our team will contact you Soon ";
                }
            });
            form.reset();
        }
    }
}
ContactComponent.ɵfac = function ContactComponent_Factory(t) { return new (t || ContactComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_util_util_service__WEBPACK_IMPORTED_MODULE_2__["UtilService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"])); };
ContactComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ContactComponent, selectors: [["app-contact"]], decls: 70, vars: 6, consts: [["id", "contact", 1, "contact"], [1, "container"], ["data-aos", "fade-up", 1, "section-title"], [1, "row"], ["data-aos", "fade-up", "data-aos-delay", "100", 1, "col-lg-4", "col-md-6"], [1, "contact-about"], [1, "social-links"], ["target", "_blank", 1, "twitter", 3, "click"], [1, "icofont-twitter"], ["target", "_blank", 1, "facebook", 3, "click"], [1, "icofont-facebook"], ["target", "_blank", 1, "instagram", 3, "click"], [1, "icofont-instagram"], ["target", "_blank", 1, "linkedin", 3, "click"], [1, "icofont-linkedin"], [1, "icofont-youtube"], ["data-aos", "fade-up", "data-aos-delay", "200", 1, "col-lg-3", "col-md-6", "mt-4", "mt-md-0"], [1, "info"], [1, "ri-map-pin-line"], [1, "ri-mail-send-line"], [1, "ri-phone-line"], ["data-aos", "fade-up", "data-aos-delay", "300", 1, "col-lg-5", "col-md-12"], [3, "submit"], ["contactForm", "ngForm"], [1, "form-group"], ["type", "text", "name", "name", "ngModel", "", "id", "name", "placeholder", "Your Name", "required", "", 1, "form-control"], ["name", "ngModel"], [1, "invalid-feedback", 3, "hidden"], ["type", "email", "ngModel", "", "name", "email", "id", "email", "placeholder", "Your Email", "required", "", 1, "form-control"], ["email", "ngModel"], ["type", "text", "ngModel", "", "name", "subject", "id", "subject", "placeholder", "Subject", "required", "", 1, "form-control"], ["subject", "ngModel"], ["ngModel", "", "name", "message", "rows", "5", "placeholder", "Message", "required", "", 1, "form-control"], ["message", "ngModel"], [1, "text-center"], ["type", "submit", 3, "disabled"]], template: function ContactComponent_Template(rf, ctx) { if (rf & 1) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Contact Us");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "NinthSem");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "We are India's first and only skill based digital learning platform which provides training and guidance to engineering students and aspirants of the Core and Non-IT industries.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactComponent_Template_a_click_14_listener() { return ctx.openSocialMedia(ctx.sm.TWITTER); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "i", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactComponent_Template_a_click_16_listener() { return ctx.openSocialMedia(ctx.sm.FACEBOOK); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "i", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactComponent_Template_a_click_18_listener() { return ctx.openSocialMedia(ctx.sm.INSTAGRAM); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "i", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactComponent_Template_a_click_20_listener() { return ctx.openSocialMedia(ctx.sm.LINKEDIN); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "i", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactComponent_Template_a_click_22_listener() { return ctx.openSocialMedia(ctx.sm.YOUTUBE); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "i", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "i", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Avyukt Edutech Pvt. Ltd. 404, Ashok Vatika, Chakeisiani, Bhubaneswar.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "i", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "contact@ninthsem.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "i", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "+91 7303337338");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "form", 22, 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function ContactComponent_Template_form_submit_39_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](40); return ctx.Submit(_r0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "input", 25, 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Please Enter Name !!!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "input", 28, 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Please Enter Email !!!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "input", 30, 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Please Enter subject !!!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "textarea", 32, 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, "Please Enter message !!!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "button", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Send Message");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "app-footer");
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](40);
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](43);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](49);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](55);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r1.valid || _r1.pristine);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r2.valid || _r2.pristine);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r3.valid || _r3.pristine);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r4.valid || _r4.pristine);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", _r0.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.msg, " ");
    } }, directives: [_component_header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["RequiredValidator"], _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_6__["FooterComponent"]], styles: ["section[_ngcontent-%COMP%] {\r\n    padding: 60px 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.section-bg[_ngcontent-%COMP%] {\r\n    background-color: #f7fbfe;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    padding-bottom: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    font-size: 32px;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n    position: relative;\r\n    color: #222222;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before, .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\r\n    margin: 0 15px 10px 0;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    margin: 0 0 10px 15px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin: 15px 0 0 0;\r\n}\r\n\r\n#contact[_ngcontent-%COMP%] {\r\n    background-color: #e4eded\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .contact-about[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n    font-size: 28px;\r\n    margin: 0 0 10px 0;\r\n    padding: 0;\r\n    line-height: 1;\r\n    font-weight: 700;\r\n    letter-spacing: 1px;\r\n    color: #222222;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .contact-about[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    font-size: 14px;\r\n    line-height: 24px;\r\n    font-family: \"Raleway\", sans-serif;\r\n    color: #888;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .social-links[_ngcontent-%COMP%] {\r\n    padding-bottom: 20px;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    font-size: 18px;\r\n    display: inline-block;\r\n    background: #fff;\r\n    color: #f0ab18;\r\n    line-height: 1;\r\n    padding: 8px 0;\r\n    margin-right: 4px;\r\n    border-radius: 50%;\r\n    text-align: center;\r\n    width: 36px;\r\n    height: 36px;\r\n    transition: 0.3s;\r\n    border: 1px solid #f0ab18;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\r\n    background: #f0ab18;\r\n    color: #fff;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%] {\r\n    color: #444444;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n    font-size: 32px;\r\n    color: #f0ab18;\r\n    float: left;\r\n    line-height: 1;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    padding: 0 0 10px 42px;\r\n    line-height: 28px;\r\n    font-size: 14px;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .php-email-form[_ngcontent-%COMP%]   .validate[_ngcontent-%COMP%] {\r\n    display: none;\r\n    color: red;\r\n    margin: 0 0 15px 0;\r\n    font-weight: 400;\r\n    font-size: 13px;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .php-email-form[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\r\n    display: none;\r\n    color: #fff;\r\n    background: #ed3c0d;\r\n    text-align: center;\r\n    padding: 15px;\r\n    font-weight: 600;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .php-email-form[_ngcontent-%COMP%]   .sent-message[_ngcontent-%COMP%] {\r\n    display: none;\r\n    color: #fff;\r\n    background: #18d26e;\r\n    text-align: center;\r\n    padding: 15px;\r\n    font-weight: 600;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .php-email-form[_ngcontent-%COMP%]   .loading[_ngcontent-%COMP%] {\r\n    display: none;\r\n    background: #fff;\r\n    text-align: center;\r\n    padding: 15px;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .php-email-form[_ngcontent-%COMP%]   .loading[_ngcontent-%COMP%]:before {\r\n    content: \"\";\r\n    display: inline-block;\r\n    border-radius: 50%;\r\n    width: 24px;\r\n    height: 24px;\r\n    margin: 0 10px -6px 0;\r\n    border: 3px solid #18d26e;\r\n    border-top-color: #eee;\r\n    -webkit-animation: animate-loading 1s linear infinite;\r\n    animation: animate-loading 1s linear infinite;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .php-email-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .contact[_ngcontent-%COMP%]   .php-email-form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\r\n    border-radius: 0;\r\n    box-shadow: none;\r\n    font-size: 14px;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .php-email-form[_ngcontent-%COMP%]   button[type=\"submit\"][_ngcontent-%COMP%] {\r\n    background: #f0ab18;\r\n    border: 0;\r\n    padding: 10px 24px;\r\n    color: #fff;\r\n    transition: 0.4s;\r\n    border-radius: 50px;\r\n}\r\n\r\n.contact[_ngcontent-%COMP%]   .php-email-form[_ngcontent-%COMP%]   button[type=\"submit\"][_ngcontent-%COMP%]:hover {\r\n    background: #2383c4;\r\n}\r\n\r\n@-webkit-keyframes animate-loading {\r\n    0% {\r\n        transform: rotate(0deg);\r\n    }\r\n    100% {\r\n        transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n@keyframes animate-loading {\r\n    0% {\r\n        transform: rotate(0deg);\r\n    }\r\n    100% {\r\n        transform: rotate(360deg);\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9jb250YWN0L2NvbnRhY3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsa0JBQWtCO0lBQ2xCLGNBQWM7QUFDbEI7O0FBRUE7O0lBRUksV0FBVztJQUNYLFdBQVc7SUFDWCxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFJQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixrQ0FBa0M7SUFDbEMsV0FBVztBQUNmOztBQUVBO0lBQ0ksb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsY0FBYztJQUNkLFdBQVc7SUFDWCxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLGlCQUFpQjtJQUNqQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLFVBQVU7SUFDVixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsYUFBYTtBQUNqQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLHlCQUF5QjtJQUN6QixzQkFBc0I7SUFDdEIscURBQXFEO0lBQ3JELDZDQUE2QztBQUNqRDs7QUFFQTs7SUFFSSxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsU0FBUztJQUNULGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJO1FBQ0ksdUJBQXVCO0lBQzNCO0lBQ0E7UUFDSSx5QkFBeUI7SUFDN0I7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksdUJBQXVCO0lBQzNCO0lBQ0E7UUFDSSx5QkFBeUI7SUFDN0I7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvY29udGFjdC9jb250YWN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJzZWN0aW9uIHtcclxuICAgIHBhZGRpbmc6IDYwcHggMDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5zZWN0aW9uLWJnIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2ZiZmU7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMiB7XHJcbiAgICBmb250LXNpemU6IDMycHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBjb2xvcjogIzIyMjIyMjtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDI6OmJlZm9yZSxcclxuLnNlY3Rpb24tdGl0bGUgaDI6OmFmdGVyIHtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDJweDtcclxuICAgIGJhY2tncm91bmQ6ICNmMGFiMTg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjpiZWZvcmUge1xyXG4gICAgbWFyZ2luOiAwIDE1cHggMTBweCAwO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YWZ0ZXIge1xyXG4gICAgbWFyZ2luOiAwIDAgMTBweCAxNXB4O1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBwIHtcclxuICAgIG1hcmdpbjogMTVweCAwIDAgMDtcclxufVxyXG5cclxuXHJcblxyXG4jY29udGFjdCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTRlZGVkXHJcbn1cclxuXHJcbi5jb250YWN0IC5jb250YWN0LWFib3V0IGgzIHtcclxuICAgIGZvbnQtc2l6ZTogMjhweDtcclxuICAgIG1hcmdpbjogMCAwIDEwcHggMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBsaW5lLWhlaWdodDogMTtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMXB4O1xyXG4gICAgY29sb3I6ICMyMjIyMjI7XHJcbn1cclxuXHJcbi5jb250YWN0IC5jb250YWN0LWFib3V0IHAge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XHJcbiAgICBmb250LWZhbWlseTogXCJSYWxld2F5XCIsIHNhbnMtc2VyaWY7XHJcbiAgICBjb2xvcjogIzg4ODtcclxufVxyXG5cclxuLmNvbnRhY3QgLnNvY2lhbC1saW5rcyB7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLmNvbnRhY3QgLnNvY2lhbC1saW5rcyBhIHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBjb2xvcjogI2YwYWIxODtcclxuICAgIGxpbmUtaGVpZ2h0OiAxO1xyXG4gICAgcGFkZGluZzogOHB4IDA7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDRweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHdpZHRoOiAzNnB4O1xyXG4gICAgaGVpZ2h0OiAzNnB4O1xyXG4gICAgdHJhbnNpdGlvbjogMC4zcztcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNmMGFiMTg7XHJcbn1cclxuXHJcbi5jb250YWN0IC5zb2NpYWwtbGlua3MgYTpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjBhYjE4O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbn1cclxuXHJcbi5jb250YWN0IC5pbmZvIHtcclxuICAgIGNvbG9yOiAjNDQ0NDQ0O1xyXG59XHJcblxyXG4uY29udGFjdCAuaW5mbyBpIHtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgIGNvbG9yOiAjZjBhYjE4O1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICBsaW5lLWhlaWdodDogMTtcclxufVxyXG5cclxuLmNvbnRhY3QgLmluZm8gcCB7XHJcbiAgICBwYWRkaW5nOiAwIDAgMTBweCA0MnB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDI4cHg7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5jb250YWN0IC5waHAtZW1haWwtZm9ybSAudmFsaWRhdGUge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICAgIGNvbG9yOiByZWQ7XHJcbiAgICBtYXJnaW46IDAgMCAxNXB4IDA7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG59XHJcblxyXG4uY29udGFjdCAucGhwLWVtYWlsLWZvcm0gLmVycm9yLW1lc3NhZ2Uge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgYmFja2dyb3VuZDogI2VkM2MwZDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcblxyXG4uY29udGFjdCAucGhwLWVtYWlsLWZvcm0gLnNlbnQtbWVzc2FnZSB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMThkMjZlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMTVweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi5jb250YWN0IC5waHAtZW1haWwtZm9ybSAubG9hZGluZyB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbn1cclxuXHJcbi5jb250YWN0IC5waHAtZW1haWwtZm9ybSAubG9hZGluZzpiZWZvcmUge1xyXG4gICAgY29udGVudDogXCJcIjtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgaGVpZ2h0OiAyNHB4O1xyXG4gICAgbWFyZ2luOiAwIDEwcHggLTZweCAwO1xyXG4gICAgYm9yZGVyOiAzcHggc29saWQgIzE4ZDI2ZTtcclxuICAgIGJvcmRlci10b3AtY29sb3I6ICNlZWU7XHJcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYW5pbWF0ZS1sb2FkaW5nIDFzIGxpbmVhciBpbmZpbml0ZTtcclxuICAgIGFuaW1hdGlvbjogYW5pbWF0ZS1sb2FkaW5nIDFzIGxpbmVhciBpbmZpbml0ZTtcclxufVxyXG5cclxuLmNvbnRhY3QgLnBocC1lbWFpbC1mb3JtIGlucHV0LFxyXG4uY29udGFjdCAucGhwLWVtYWlsLWZvcm0gdGV4dGFyZWEge1xyXG4gICAgYm9yZGVyLXJhZGl1czogMDtcclxuICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5jb250YWN0IC5waHAtZW1haWwtZm9ybSBidXR0b25bdHlwZT1cInN1Ym1pdFwiXSB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjBhYjE4O1xyXG4gICAgYm9yZGVyOiAwO1xyXG4gICAgcGFkZGluZzogMTBweCAyNHB4O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjRzO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcclxufVxyXG5cclxuLmNvbnRhY3QgLnBocC1lbWFpbC1mb3JtIGJ1dHRvblt0eXBlPVwic3VibWl0XCJdOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6ICMyMzgzYzQ7XHJcbn1cclxuXHJcbkAtd2Via2l0LWtleWZyYW1lcyBhbmltYXRlLWxvYWRpbmcge1xyXG4gICAgMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgIH1cclxufVxyXG5cclxuQGtleWZyYW1lcyBhbmltYXRlLWxvYWRpbmcge1xyXG4gICAgMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgIH1cclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ContactComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-contact',
                templateUrl: './contact.component.html',
                styleUrls: ['./contact.component.css']
            }]
    }], function () { return [{ type: _util_util_service__WEBPACK_IMPORTED_MODULE_2__["UtilService"] }, { type: src_app_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] }]; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
const environment = {
    production: true,
    Apiurl: 'https://ninthsemelb-439668971.ap-south-1.elb.amazonaws.com/' // FIREBASE BACKEND ENDPOINT
    // Apiurl : 'http://localhost:4000' // LOCAL BACKEND ENDPOINT
    // Apiurl : 'http://ec2-65-0-91-106.ap-south-1.compute.amazonaws.com:4800' // OLD BACKEND AWS ENDPOINT
    // Apiurl : 'ninthsem.net' // NEW BACKEND AWS ENDPOINT
};


/***/ }),

/***/ "BZkP":
/*!*********************************************************!*\
  !*** ./src/app/component/authentication/auth.module.ts ***!
  \*********************************************************/
/*! exports provided: AngularMaterialComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularMaterialComponent", function() { return AngularMaterialComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _pay_success_pay_success_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pay-success/pay-success.component */ "DBZS");



















class AngularMaterialComponent {
}
AngularMaterialComponent.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AngularMaterialComponent });
AngularMaterialComponent.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AngularMaterialComponent_Factory(t) { return new (t || AngularMaterialComponent)(); }, imports: [[
            _angular_material_input__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__["MatProgressSpinnerModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__["MatRadioModule"],
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_11__["MatMenuModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__["MatButtonToggleModule"],
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabsModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__["MatSidenavModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_16__["MatListModule"]
        ], _angular_material_input__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__["MatProgressSpinnerModule"],
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__["MatRadioModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_11__["MatMenuModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__["MatButtonToggleModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabsModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__["MatSidenavModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_16__["MatListModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AngularMaterialComponent, { declarations: [_pay_success_pay_success_component__WEBPACK_IMPORTED_MODULE_17__["PaySuccessComponent"]], imports: [_angular_material_input__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__["MatProgressSpinnerModule"],
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__["MatRadioModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_11__["MatMenuModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__["MatButtonToggleModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabsModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__["MatSidenavModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_16__["MatListModule"]], exports: [_angular_material_input__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__["MatProgressSpinnerModule"],
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__["MatRadioModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_11__["MatMenuModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__["MatButtonToggleModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabsModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__["MatSidenavModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_16__["MatListModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AngularMaterialComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
                    _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"],
                    _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__["MatProgressSpinnerModule"],
                    _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
                    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                    _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__["MatRadioModule"],
                    _angular_material_menu__WEBPACK_IMPORTED_MODULE_11__["MatMenuModule"],
                    _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__["MatButtonToggleModule"],
                    _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabsModule"],
                    _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
                    _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__["MatSidenavModule"],
                    _angular_material_list__WEBPACK_IMPORTED_MODULE_16__["MatListModule"]
                ],
                exports: [
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
                    _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"],
                    _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__["MatProgressSpinnerModule"],
                    _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
                    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                    _angular_material_radio__WEBPACK_IMPORTED_MODULE_10__["MatRadioModule"],
                    _angular_material_menu__WEBPACK_IMPORTED_MODULE_11__["MatMenuModule"],
                    _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__["MatButtonToggleModule"],
                    _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabsModule"],
                    _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
                    _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__["MatSidenavModule"],
                    _angular_material_list__WEBPACK_IMPORTED_MODULE_16__["MatListModule"]
                ],
                declarations: [_pay_success_pay_success_component__WEBPACK_IMPORTED_MODULE_17__["PaySuccessComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "CBMx":
/*!****************************************************************!*\
  !*** ./src/app/pageComponent/home-page/home-page.component.ts ***!
  \****************************************************************/
/*! exports provided: HomePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageComponent", function() { return HomePageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var src_app_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/component/authentication/auth.service */ "ddlN");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _component_header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/header/header.component */ "Pk+G");
/* harmony import */ var _slider_slider_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../slider/slider.component */ "uZWA");
/* harmony import */ var _awards_awards_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../awards/awards.component */ "q+By");
/* harmony import */ var _services_services_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/services.component */ "I4oE");
/* harmony import */ var _milestone_milestone_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../milestone/milestone.component */ "F7Eq");
/* harmony import */ var _course_component_course_component_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../course-component/course-component.component */ "dHIS");
/* harmony import */ var _testimonials_testimonials_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../testimonials/testimonials.component */ "L3jg");
/* harmony import */ var _faq_faq_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../faq/faq.component */ "nUvK");
/* harmony import */ var _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../component/footer/footer.component */ "xb3B");














class HomePageComponent {
    constructor(utilService, authService, matDialog) {
        this.utilService = utilService;
        this.authService = authService;
        this.matDialog = matDialog;
    }
    ngOnInit() {
    }
}
HomePageComponent.ɵfac = function HomePageComponent_Factory(t) { return new (t || HomePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_1__["UtilService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"])); };
HomePageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomePageComponent, selectors: [["app-home-page"]], decls: 9, vars: 0, template: function HomePageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-slider");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-awards");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-services");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-milestone");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-course-component");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "app-testimonials");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "app-faq");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "app-footer");
    } }, directives: [_component_header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _slider_slider_component__WEBPACK_IMPORTED_MODULE_5__["SliderComponent"], _awards_awards_component__WEBPACK_IMPORTED_MODULE_6__["AwardsComponent"], _services_services_component__WEBPACK_IMPORTED_MODULE_7__["ServicesComponent"], _milestone_milestone_component__WEBPACK_IMPORTED_MODULE_8__["MilestoneComponent"], _course_component_course_component_component__WEBPACK_IMPORTED_MODULE_9__["CourseComponentComponent"], _testimonials_testimonials_component__WEBPACK_IMPORTED_MODULE_10__["TestimonialsComponent"], _faq_faq_component__WEBPACK_IMPORTED_MODULE_11__["FaqComponent"], _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_12__["FooterComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvaG9tZS1wYWdlL2hvbWUtcGFnZS5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomePageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-home-page',
                templateUrl: './home-page.component.html',
                styleUrls: ['./home-page.component.css']
            }]
    }], function () { return [{ type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_1__["UtilService"] }, { type: src_app_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] }]; }, null); })();


/***/ }),

/***/ "DBZS":
/*!*******************************************************************************!*\
  !*** ./src/app/component/authentication/pay-success/pay-success.component.ts ***!
  \*******************************************************************************/
/*! exports provided: PaySuccessComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaySuccessComponent", function() { return PaySuccessComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _payment_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../payment.service */ "+wL8");
/* harmony import */ var _util_util_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../util/util.service */ "izIa");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");






class PaySuccessComponent {
    constructor(paymentService, utilService) {
        this.paymentService = paymentService;
        this.utilService = utilService;
        this.isSuccess = false;
    }
    ngOnInit() {
        this.isSuccess = this.paymentService.getPaymentStatus();
        this.passStatusListener = this.paymentService.getPaymentStatusListener()
            .subscribe(issuccess => this.isSuccess = issuccess);
        this.passStatusListener = this.paymentService.getPaymentStatusListener().subscribe(isChanged => {
            this.isSuccess = isChanged;
            // this.utilService.setLoaderStatus(this.isSuccess);
        });
    }
}
PaySuccessComponent.ɵfac = function PaySuccessComponent_Factory(t) { return new (t || PaySuccessComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_payment_service__WEBPACK_IMPORTED_MODULE_1__["PaymentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_util_util_service__WEBPACK_IMPORTED_MODULE_2__["UtilService"])); };
PaySuccessComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PaySuccessComponent, selectors: [["app-pay-success"]], decls: 9, vars: 0, consts: [["src", "/assets/images/ninthsemlogo.png", "alt", "img", 1, "align-center"], ["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "content"], ["mat-dialog-actions", ""], ["mat-button", "", "mat-dialog-close", ""]], template: function PaySuccessComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Successful !!!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Payment is successful , check Your Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogClose"]], styles: ["img[_ngcontent-%COMP%]{\r\n    max-height: 5rem;\r\n    max-width: 16rem;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL3BheS1zdWNjZXNzL3BheS1zdWNjZXNzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0VBQ2xCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL3BheS1zdWNjZXNzL3BheS1zdWNjZXNzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpbWd7XHJcbiAgICBtYXgtaGVpZ2h0OiA1cmVtO1xyXG4gICAgbWF4LXdpZHRoOiAxNnJlbTtcclxuICB9XHJcbiAgIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PaySuccessComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-pay-success',
                templateUrl: './pay-success.component.html',
                styleUrls: ['./pay-success.component.css']
            }]
    }], function () { return [{ type: _payment_service__WEBPACK_IMPORTED_MODULE_1__["PaymentService"] }, { type: _util_util_service__WEBPACK_IMPORTED_MODULE_2__["UtilService"] }]; }, null); })();


/***/ }),

/***/ "F7Eq":
/*!****************************************************************!*\
  !*** ./src/app/pageComponent/milestone/milestone.component.ts ***!
  \****************************************************************/
/*! exports provided: MilestoneComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MilestoneComponent", function() { return MilestoneComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class MilestoneComponent {
    constructor() { }
    ngOnInit() {
    }
}
MilestoneComponent.ɵfac = function MilestoneComponent_Factory(t) { return new (t || MilestoneComponent)(); };
MilestoneComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MilestoneComponent, selectors: [["app-milestone"]], decls: 51, vars: 0, consts: [["id", "counts", 1, "counts"], [1, "container"], ["data-aos", "fade-up", 1, "section-title"], [1, "row"], ["data-aos", "fade-up", "data-aos", "fade-right", "data-aos-delay", "150", 1, "image", "col-xl-5", "d-flex", "align-items-stretch", "justify-content-center", "justify-content-xl-start"], ["src", "assets/images/counts-img.svg", "alt", "", 1, "img-fluid"], ["data-aos", "fade-left", "data-aos-delay", "300", 1, "col-xl-7", "d-flex", "align-items-stretch", "pt-4", "pt-xl-0"], [1, "content", "d-flex", "flex-column", "justify-content-center"], [1, "col-md-6", "d-md-flex", "align-items-md-stretch"], [1, "count-box"], [1, "fas", "fa-play"], ["data-toggle", "counter-up"], [1, "fas", "fa-chalkboard-teacher"], [1, "fas", "fa-user-graduate"], [1, "icofont-award"]], template: function MilestoneComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Milestone");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "i", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "500");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "+");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Video Lectures To Give Aspirants The Much Required Technical Know How And Persectives");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "i", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "50");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "+");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Passionate IEs With an Average of 5-8 Years Industrial Experience Who Make These Videos");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "2000");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "+");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Satisfied Industry Ready Users");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "i", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "10");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "+");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Success Stories of Delegates From Core Industries");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["section[_ngcontent-%COMP%] {\r\n    padding: 60px 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.section-bg[_ngcontent-%COMP%] {\r\n    background-color: #f7fbfe;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    padding-bottom: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    font-size: 32px;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n    position: relative;\r\n    color: #222222;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before, .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\r\n    margin: 0 15px 10px 0;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    margin: 0 0 10px 15px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin: 15px 0 0 0;\r\n}\r\n\r\n.counts[_ngcontent-%COMP%] {\r\n    padding-top: 0;\r\n}\r\n\r\n.counts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {\r\n    padding: 0;\r\n}\r\n\r\n.counts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n    font-weight: 700;\r\n    font-size: 34px;\r\n    color: #222222;\r\n}\r\n\r\n.counts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin-bottom: 0;\r\n}\r\n\r\n.counts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .count-box[_ngcontent-%COMP%] {\r\n    padding: 20px 0;\r\n    width: 100%;\r\n}\r\n\r\n.counts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .count-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n    display: block;\r\n    font-size: 36px;\r\n    color: #f0ab18;\r\n    float: left;\r\n}\r\n\r\n.counts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .count-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    font-size: 36px;\r\n    font-weight: 700;\r\n    color: #222222;\r\n    margin-left: 15px;\r\n}\r\n\r\n.counts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .count-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    padding: 15px 0 0 0;\r\n    margin: 0 0 0 50px;\r\n    font-family: \"Raleway\", sans-serif;\r\n    font-size: 14px;\r\n    color: #484848;\r\n}\r\n\r\n.counts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .count-box[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    font-weight: 600;\r\n    display: block;\r\n    margin-top: 20px;\r\n    color: #484848;\r\n    font-size: 15px;\r\n    font-family: \"Poppins\", sans-serif;\r\n    transition: ease-in-out 0.3s;\r\n}\r\n\r\n.counts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .count-box[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\r\n    color: #6f6f6f;\r\n}\r\n\r\n@media (max-width: 1024px) {\r\n    .counts[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%] {\r\n        text-align: center;\r\n    }\r\n    .counts[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n        max-width: 70%;\r\n    }\r\n}\r\n\r\n@media (max-width: 667px) {\r\n    .counts[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n        max-width: 100%;\r\n    }\r\n}\r\n\r\nstrong[_ngcontent-%COMP%]{\r\n    color:black !important;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9taWxlc3RvbmUvbWlsZXN0b25lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLGtCQUFrQjtJQUNsQixjQUFjO0FBQ2xCOztBQUVBOztJQUVJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBR0E7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxlQUFlO0lBQ2YsY0FBYztJQUNkLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsa0NBQWtDO0lBQ2xDLGVBQWU7SUFDZixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGVBQWU7SUFDZixrQ0FBa0M7SUFDbEMsNEJBQTRCO0FBQ2hDOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJO1FBQ0ksa0JBQWtCO0lBQ3RCO0lBQ0E7UUFDSSxjQUFjO0lBQ2xCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGVBQWU7SUFDbkI7QUFDSjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvbWlsZXN0b25lL21pbGVzdG9uZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsic2VjdGlvbiB7XHJcbiAgICBwYWRkaW5nOiA2MHB4IDA7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4uc2VjdGlvbi1iZyB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmYmZlO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMzBweDtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDIge1xyXG4gICAgZm9udC1zaXplOiAzMnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgY29sb3I6ICMyMjIyMjI7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjpiZWZvcmUsXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjphZnRlciB7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgaGVpZ2h0OiAycHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjBhYjE4O1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YmVmb3JlIHtcclxuICAgIG1hcmdpbjogMCAxNXB4IDEwcHggMDtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDI6OmFmdGVyIHtcclxuICAgIG1hcmdpbjogMCAwIDEwcHggMTVweDtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgcCB7XHJcbiAgICBtYXJnaW46IDE1cHggMCAwIDA7XHJcbn1cclxuXHJcblxyXG4uY291bnRzIHtcclxuICAgIHBhZGRpbmctdG9wOiAwO1xyXG59XHJcblxyXG4uY291bnRzIC5jb250ZW50IHtcclxuICAgIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbi5jb3VudHMgLmNvbnRlbnQgaDMge1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIGZvbnQtc2l6ZTogMzRweDtcclxuICAgIGNvbG9yOiAjMjIyMjIyO1xyXG59XHJcblxyXG4uY291bnRzIC5jb250ZW50IHAge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcclxufVxyXG5cclxuLmNvdW50cyAuY29udGVudCAuY291bnQtYm94IHtcclxuICAgIHBhZGRpbmc6IDIwcHggMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uY291bnRzIC5jb250ZW50IC5jb3VudC1ib3ggaSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGZvbnQtc2l6ZTogMzZweDtcclxuICAgIGNvbG9yOiAjZjBhYjE4O1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbn1cclxuXHJcbi5jb3VudHMgLmNvbnRlbnQgLmNvdW50LWJveCBzcGFuIHtcclxuICAgIGZvbnQtc2l6ZTogMzZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBjb2xvcjogIzIyMjIyMjtcclxuICAgIG1hcmdpbi1sZWZ0OiAxNXB4O1xyXG59XHJcblxyXG4uY291bnRzIC5jb250ZW50IC5jb3VudC1ib3ggcCB7XHJcbiAgICBwYWRkaW5nOiAxNXB4IDAgMCAwO1xyXG4gICAgbWFyZ2luOiAwIDAgMCA1MHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IFwiUmFsZXdheVwiLCBzYW5zLXNlcmlmO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgY29sb3I6ICM0ODQ4NDg7XHJcbn1cclxuXHJcbi5jb3VudHMgLmNvbnRlbnQgLmNvdW50LWJveCBhIHtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICBjb2xvcjogIzQ4NDg0ODtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIGZvbnQtZmFtaWx5OiBcIlBvcHBpbnNcIiwgc2Fucy1zZXJpZjtcclxuICAgIHRyYW5zaXRpb246IGVhc2UtaW4tb3V0IDAuM3M7XHJcbn1cclxuXHJcbi5jb3VudHMgLmNvbnRlbnQgLmNvdW50LWJveCBhOmhvdmVyIHtcclxuICAgIGNvbG9yOiAjNmY2ZjZmO1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogMTAyNHB4KSB7XHJcbiAgICAuY291bnRzIC5pbWFnZSB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG4gICAgLmNvdW50cyAuaW1hZ2UgaW1nIHtcclxuICAgICAgICBtYXgtd2lkdGg6IDcwJTtcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDY2N3B4KSB7XHJcbiAgICAuY291bnRzIC5pbWFnZSBpbWcge1xyXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgIH1cclxufVxyXG5cclxuc3Ryb25ne1xyXG4gICAgY29sb3I6YmxhY2sgIWltcG9ydGFudDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MilestoneComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-milestone',
                templateUrl: './milestone.component.html',
                styleUrls: ['./milestone.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "Hbat":
/*!************************************************************************************************!*\
  !*** ./src/app/pageComponent/company/payment-refund-policy/payment-refund-policy.component.ts ***!
  \************************************************************************************************/
/*! exports provided: PaymentRefundPolicyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentRefundPolicyComponent", function() { return PaymentRefundPolicyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PaymentRefundPolicyComponent {
    constructor() { }
    ngOnInit() {
    }
}
PaymentRefundPolicyComponent.ɵfac = function PaymentRefundPolicyComponent_Factory(t) { return new (t || PaymentRefundPolicyComponent)(); };
PaymentRefundPolicyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PaymentRefundPolicyComponent, selectors: [["app-payment-refund-policy"]], decls: 76, vars: 0, consts: [[1, "inner-page"], [1, "container", "mainDiv"], ["data-aos", "fade-up", 1, "section-title"], ["href", "ninthsem.net"], [2, "color", "black"], [2, "list-style-type", "disc"], [1, "container"], [1, "row"], [1, "col-md-2"]], template: function PaymentRefundPolicyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Payment and Refund Policy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "We at ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "ninthsem.net");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " offer you various lecture sessions, weekly Q&S, placement guidance and technical and non-technical certifications. The packages that we offer begin from 298 INR to a premium plan of 4998 INR. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "strong", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "u");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "PAYMENT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "ul", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Payment at our website is to be made in advance by purchasing the desired course. Once payment is received, your purchase will be scheduled. You will receive an e-mail on your registered e-mail ID regarding such purchase and the details regarding the same. By purchasing a package on our website, you agree to the terms and conditions of our service.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "After you choose a package, any attendance or submission thereof will count towards your certificate. Accepted Payment Methods: You can make payments on ninthsem.net using your");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Credit Card (Master Card, Visa, Rupay)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " Debit Card (Master Card, Visa, Rupay)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " Net Banking");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, " E-Wallet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "It must be noted that we do not offer gift cards or any other options for making payment on behalf of another user. All payments must be made from the respective account of the user. Payment once made cannot be transferred.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "When you decide to save your payment information, we will save your payment information securely. You can change details or delete such information at any point of time");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "strong", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "u");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "REFUND");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "ul", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "For our clauses related to refund deadlines and policy adopted, we request you to continue reading the document thoroughly. Our subscription mount depends on the package that you have chosen. While registering for a course, you are entitled to pay the whole amount via the payment methods mentioned in the first part of this document. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Please note that, we treat violations or any misconduct from your side very seriously. We request you to also go through our Terms & Conditions for more information. We at Avyukt Edutech Pvt. Ltd., are under no obligation to refund any amount, if the termination or cancellation of subscription has occurred because of your misconduct. We request you to go through the content of each package. In no circumstances, we are obliged to review your refund request, due to any confusion or complication from you side with respect to our content offering.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "If you wish to cancel your package or course, you must convey such cancellation request to us within 14 days from the date of payment, mentioning a reason at refund@ninthsem.com. We will review your request and confirm the same via your registered email-ID. Refund application will be governed by our terms and conditions. The refund period and limitation period will differ from package to package. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "We will deduct charges incurred from your enrollment and transfer such remainder to your account as per the details provided by you.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "No cases of refund shall be entertained after the expiration of limitation period. We have no obligation to provide refund or vouchers for any other services.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, " For any queries contact at,");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "Registered Address:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, " Avyukt Edutech Pvt. Ltd.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, " 404 Ashok Vatika");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, " Chakeisiani, Bhubaneswar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "E-mail ID:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, " contact@ninthsem.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Contact No:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "+91 9437 855 859 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["section[_ngcontent-%COMP%] {\r\n    padding: 60px 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.section-bg[_ngcontent-%COMP%] {\r\n    background-color: #f7fbfe;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    padding-bottom: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    font-size: 32px;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n    position: relative;\r\n    color: #222222;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before, .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\r\n    margin: 0 15px 10px 0;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    margin: 0 0 10px 15px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin: 15px 0 0 0;\r\n}\r\n\r\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], b[_ngcontent-%COMP%]{\r\n    font-family: \"Raleway\", sans-serif;\r\n}\r\n\r\nli[_ngcontent-%COMP%]{\r\n    padding-bottom: 10px;\r\n}\r\n\r\n.ull[_ngcontent-%COMP%]{\r\n    margin-left: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    margin-bottom: 0px !important;\r\n}\r\n\r\n.mainDiv[_ngcontent-%COMP%]{\r\n    height: 50rem;\r\n    overflow-y: scroll;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9jb21wYW55L3BheW1lbnQtcmVmdW5kLXBvbGljeS9wYXltZW50LXJlZnVuZC1wb2xpY3kuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLGtCQUFrQjtJQUNsQixjQUFjO0FBQ2xCOztBQUVBOztJQUVJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQ0FBa0M7QUFDdEM7O0FBRUE7SUFDSSxvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSw2QkFBNkI7QUFDakM7O0FBQ0E7SUFDSSxhQUFhO0lBQ2Isa0JBQWtCO0FBQ3RCIiwiZmlsZSI6InNyYy9hcHAvcGFnZUNvbXBvbmVudC9jb21wYW55L3BheW1lbnQtcmVmdW5kLXBvbGljeS9wYXltZW50LXJlZnVuZC1wb2xpY3kuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5zZWN0aW9uIHtcclxuICAgIHBhZGRpbmc6IDYwcHggMDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5zZWN0aW9uLWJnIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2ZiZmU7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMiB7XHJcbiAgICBmb250LXNpemU6IDMycHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBjb2xvcjogIzIyMjIyMjtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDI6OmJlZm9yZSxcclxuLnNlY3Rpb24tdGl0bGUgaDI6OmFmdGVyIHtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDJweDtcclxuICAgIGJhY2tncm91bmQ6ICNmMGFiMTg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjpiZWZvcmUge1xyXG4gICAgbWFyZ2luOiAwIDE1cHggMTBweCAwO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YWZ0ZXIge1xyXG4gICAgbWFyZ2luOiAwIDAgMTBweCAxNXB4O1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBwIHtcclxuICAgIG1hcmdpbjogMTVweCAwIDAgMDtcclxufVxyXG5cclxuaDEsaDIsaDMsaDQsaDUsaDYsYntcclxuICAgIGZvbnQtZmFtaWx5OiBcIlJhbGV3YXlcIiwgc2Fucy1zZXJpZjtcclxufVxyXG5cclxubGl7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLnVsbHtcclxuICAgIG1hcmdpbi1sZWZ0OiAzMHB4O1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDtcclxufVxyXG4ubWFpbkRpdntcclxuICAgIGhlaWdodDogNTByZW07XHJcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PaymentRefundPolicyComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-payment-refund-policy',
                templateUrl: './payment-refund-policy.component.html',
                styleUrls: ['./payment-refund-policy.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "I4oE":
/*!**************************************************************!*\
  !*** ./src/app/pageComponent/services/services.component.ts ***!
  \**************************************************************/
/*! exports provided: ServicesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesComponent", function() { return ServicesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ServicesComponent {
    constructor() { }
    ngOnInit() {
    }
}
ServicesComponent.ɵfac = function ServicesComponent_Factory(t) { return new (t || ServicesComponent)(); };
ServicesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ServicesComponent, selectors: [["app-services"]], decls: 68, vars: 0, consts: [["id", "features", 1, "features"], [1, "container"], ["data-aos", "fade-up", 1, "serviceDiv", "text-center"], [1, "text-dark", "text-center"], ["data-aos", "fade-up", "data-aos-delay", "300", 1, "row"], [1, "col-lg-3", "col-md-4"], [1, "icon-box"], [1, "fas", "fa-play", 2, "color", "#ffbb2c"], [1, "col-lg-3", "col-md-4", "mt-4", "mt-md-0"], [1, "fas", "fa-chalkboard-teacher", 2, "color", "#5578ff"], [1, "fas", "fa-question", 2, "color", "#e80368"], [1, "col-lg-3", "col-md-4", "mt-4", "mt-lg-0"], [1, "fas", "fa-award", 2, "color", "#e361ff"], [1, "col-lg-3", "col-md-4", "mt-4"], [1, "fas", "fa-map-marked-alt", 2, "color", "#47aeff"], [1, "fas", "fa-user-graduate", 2, "color", "#ffa76e"], [1, "fas", "fa-edit", 2, "color", "#11dbcf"], [1, "ri-price-tag-2-line", 2, "color", "#4233ff"], [1, "fas", "fa-user-tie", 2, "color", "#b2904f"], [1, "fas", "fa-users", 2, "color", "#b20969"], [1, "fas", "fa-user-plus", 2, "color", "#ff5828"], [1, "fas", "fa-hands-helping", 2, "color", "#29cc61"]], template: function ServicesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "SERVICES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "EXPLORE OUR SERVICES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Recorded Sessions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "i", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Mentorship");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "i", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "QnA Sessions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "i", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Certifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "i", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Virtual Industrial Tours");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "i", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Mock Interviews");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "CV Building Sessions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Industry Level Networking");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "i", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Personality Development");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "i", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "Weekly Live Sessions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "i", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Career Counseling ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "i", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Placement Assistance");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["section[_ngcontent-%COMP%] {\r\n    padding: 60px 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.section-bg[_ngcontent-%COMP%] {\r\n    background-color: #f7fbfe;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    padding-bottom: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    font-size: 32px;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n    position: relative;\r\n    color: #222222;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before, .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\r\n    margin: 0 15px 10px 0;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    margin: 0 0 10px 15px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin: 15px 0 0 0;\r\n}\r\n\r\n.features[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    align-items: center;\r\n    padding: 20px;\r\n    background: #f6f6f6;\r\n    transition: ease-in-out 0.3s;\r\n}\r\n\r\n.features[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n    font-size: 32px;\r\n    padding-right: 10px;\r\n    line-height: 1;\r\n}\r\n\r\n.features[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n    font-weight: 700;\r\n    margin: 0;\r\n    padding: 0;\r\n    line-height: 1;\r\n    font-size: 16px;\r\n}\r\n\r\n.features[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    color: #222222;\r\n    transition: ease-in-out 0.3s;\r\n}\r\n\r\n.features[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\r\n    color: #f0ab18;\r\n}\r\n\r\n.features[_ngcontent-%COMP%]   .icon-box[_ngcontent-%COMP%]:hover {\r\n    background: #eef7fc;\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    align-items: center;\r\n    margin-top: 5rem;\r\n    font-size: 32px;\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before, .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    margin: 1rem;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    padding: 0.3%;\r\n    font-size: 32px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9zZXJ2aWNlcy9zZXJ2aWNlcy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLHlCQUF5QjtJQUN6QixrQkFBa0I7SUFDbEIsY0FBYztBQUNsQjs7QUFFQTs7SUFFSSxXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUdBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixTQUFTO0lBQ1QsVUFBVTtJQUNWLGNBQWM7SUFDZCxlQUFlO0FBQ25COztBQUVBO0lBQ0ksY0FBYztJQUNkLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBQ0E7SUFDSSxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixlQUFlO0FBQ25COztBQUVBOztJQUVJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsZUFBZTtBQUNuQiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvc2VydmljZXMvc2VydmljZXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInNlY3Rpb24ge1xyXG4gICAgcGFkZGluZzogNjBweCAwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLnNlY3Rpb24tYmcge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZmJmZTtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDMwcHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyIHtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGNvbG9yOiAjMjIyMjIyO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YmVmb3JlLFxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YWZ0ZXIge1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIGhlaWdodDogMnB4O1xyXG4gICAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDI6OmJlZm9yZSB7XHJcbiAgICBtYXJnaW46IDAgMTVweCAxMHB4IDA7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjphZnRlciB7XHJcbiAgICBtYXJnaW46IDAgMCAxMHB4IDE1cHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIHAge1xyXG4gICAgbWFyZ2luOiAxNXB4IDAgMCAwO1xyXG59XHJcblxyXG5cclxuLmZlYXR1cmVzIC5pY29uLWJveCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjZmNmY2O1xyXG4gICAgdHJhbnNpdGlvbjogZWFzZS1pbi1vdXQgMC4zcztcclxufVxyXG5cclxuLmZlYXR1cmVzIC5pY29uLWJveCBpIHtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICBsaW5lLWhlaWdodDogMTtcclxufVxyXG5cclxuLmZlYXR1cmVzIC5pY29uLWJveCBoMyB7XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxO1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG59XHJcblxyXG4uZmVhdHVyZXMgLmljb24tYm94IGgzIGEge1xyXG4gICAgY29sb3I6ICMyMjIyMjI7XHJcbiAgICB0cmFuc2l0aW9uOiBlYXNlLWluLW91dCAwLjNzO1xyXG59XHJcblxyXG4uZmVhdHVyZXMgLmljb24tYm94IGgzIGE6aG92ZXIge1xyXG4gICAgY29sb3I6ICNmMGFiMTg7XHJcbn1cclxuXHJcbi5mZWF0dXJlcyAuaWNvbi1ib3g6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogI2VlZjdmYztcclxufVxyXG4uc2VydmljZURpdiB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiA1cmVtO1xyXG4gICAgZm9udC1zaXplOiAzMnB4O1xyXG59XHJcblxyXG4uc2VydmljZURpdiBoMTo6YmVmb3JlLFxyXG4uc2VydmljZURpdiBoMTo6YWZ0ZXIge1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIGhlaWdodDogMnB4O1xyXG4gICAgbWFyZ2luOiAxcmVtO1xyXG4gICAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLnNlcnZpY2VEaXYgaDEge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBwYWRkaW5nOiAwLjMlO1xyXG4gICAgZm9udC1zaXplOiAzMnB4O1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ServicesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-services',
                templateUrl: './services.component.html',
                styleUrls: ['./services.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "JFQj":
/*!**************************************************************************!*\
  !*** ./src/app/pageComponent/video/videos-list/videos-list.component.ts ***!
  \**************************************************************************/
/*! exports provided: VideosListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideosListComponent", function() { return VideosListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _videos_list_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../videos-list.enum */ "PyXz");
/* harmony import */ var src_app_component_authentication_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/component/authentication/enum */ "v6DW");
/* harmony import */ var src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/util/page.enum */ "7yHB");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! aos */ "9a8T");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _videos_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../videos.service */ "/n1y");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _util_util_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../util/util.service */ "izIa");
/* harmony import */ var _component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../component/authentication/auth.service */ "ddlN");
/* harmony import */ var _component_header_header_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../component/header/header.component */ "Pk+G");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");
/* harmony import */ var _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../component/footer/footer.component */ "xb3B");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");















function VideosListComponent_div_82_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " You don't have access to watch ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Branch specific");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " videos. Purchase a package to access all videos.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VideosListComponent_div_82_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.buyNow(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Buy now!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function VideosListComponent_p_83_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Videos are getting ready. Please reload the page.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function VideosListComponent_mat_spinner_85_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-spinner");
} }
function VideosListComponent_div_86_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h4", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VideosListComponent_div_86_Template_div_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const obj_r7 = ctx.$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.button(obj_r7.id, obj_r7.title); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "i", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Play");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const obj_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("src", "http://img.youtube.com/vi/", obj_r7.id, "/0.jpg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](obj_r7.title);
} }
function VideosListComponent_div_92_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h4", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VideosListComponent_div_92_Template_div_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const obj_r11 = ctx.$implicit; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.button(obj_r11.id, obj_r11.title); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "i", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Play");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const obj_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("src", "http://img.youtube.com/vi/", obj_r11.id, "/0.jpg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](obj_r11.title);
} }
class VideosListComponent {
    constructor(videoService, router, utilService, authService) {
        this.videoService = videoService;
        this.router = router;
        this.utilService = utilService;
        this.authService = authService;
        this.email = '';
        this.videoid = '';
        this.masterObj = [];
        this.dat = '0';
        this.branches = src_app_component_authentication_enum__WEBPACK_IMPORTED_MODULE_2__["BranchShortForm"];
        this.reportEnable = false;
        this.mechMasterObj = [];
        this.civilMasterObj = [];
        this.chemicalMasterObj = [];
        this.metalMasterObj = [];
        this.electricalMasterObj = [];
        this.demoMasterObject = [];
        this.branch = '';
        this.isBranch = false;
    }
    button(value, title) {
        this.videoService.videoId(value);
        this.videoService.SelectedVideoTitle(title);
        this.router.navigate([src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_3__["Page"].VIDEO_PLAYER]);
        this.utilService.ScrollToTop();
    }
    ngOnInit() {
        // if (this.paymentStauts_From_Session() && sessionStorage.getItem('isLoadedOnce') !== 'true') {
        //   this.refresh();
        // }
        aos__WEBPACK_IMPORTED_MODULE_4__["init"]();
        this.Page = src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_3__["Page"];
        this.email = this.authService.Gmail();
        this.authService.paymentDetails(this.email);
        this.branch = this.authService.getBranchValue();
        this.texts = this.branch || _videos_list_enum__WEBPACK_IMPORTED_MODULE_1__["INITIAL"];
        // console.log(this.branch);
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
        this.isBranch = sessionStorage.getItem('payment') && sessionStorage.getItem('signature') ? true : false;
        if (this.branch == '') {
            this.isBranch = false;
        }
        if (this.branch == 'Chemical Engineering') {
            this.isBranch = true;
            this.texts = _videos_list_enum__WEBPACK_IMPORTED_MODULE_1__["CHE"];
            this.masterObj = this.chemicalMasterObj;
        }
        if (this.branch == 'Civil Engineering') {
            this.isBranch = true;
            this.texts = _videos_list_enum__WEBPACK_IMPORTED_MODULE_1__["CE"];
            this.masterObj = this.civilMasterObj;
        }
        if (this.branch == 'Electrical Engineering') {
            this.isBranch = true;
            this.texts = _videos_list_enum__WEBPACK_IMPORTED_MODULE_1__["ECE"];
            this.masterObj = this.electricalMasterObj;
        }
        if (this.branch == 'Mechanical Engineering') {
            this.isBranch = true;
            this.texts = _videos_list_enum__WEBPACK_IMPORTED_MODULE_1__["ME"];
            this.masterObj = this.mechMasterObj;
        }
        if (this.branch == 'Metallurgy Engineering') {
            this.isBranch = true;
            this.texts = _videos_list_enum__WEBPACK_IMPORTED_MODULE_1__["METAL"];
            this.masterObj = this.metalMasterObj;
        }
        this.videoService.getCivil().subscribe(videosData => {
            this.videos = videosData;
            if (this.videos.length) {
                this.videos.forEach(video => {
                    this.civilMasterObj.push({ id: video.id, title: video.title });
                });
            }
        });
        this.videoService.getChemical().subscribe(videosData => {
            this.videos = videosData;
            if (this.videos.length) {
                this.videos.forEach(video => {
                    this.chemicalMasterObj.push({ id: video.id, title: video.title });
                });
            }
        });
        this.videoService.getDemo().subscribe(videosData => {
            this.videos = videosData;
            if (this.videos.length) {
                this.videos.forEach(video => {
                    this.demoMasterObject.push({ id: video.id, title: video.title });
                });
            }
        });
        this.videoService.getMech().subscribe(videosData => {
            this.videos = videosData;
            if (this.videos.length) {
                this.videos.forEach(video => {
                    this.mechMasterObj.push({ id: video.id, title: video.title });
                });
            }
        });
        this.videoService.getMetallurgy().subscribe(videosData => {
            this.videos = videosData;
            if (this.videos.length) {
                this.videos.forEach(video => {
                    this.metalMasterObj.push({ id: video.id, title: video.title });
                });
            }
        });
        this.videoService.getElectrical().subscribe(videosData => {
            this.videos = videosData;
            if (this.videos.length) {
                this.videos.forEach(video => {
                    this.electricalMasterObj.push({ id: video.id, title: video.title });
                });
            }
        });
        this.utilService.setLoaderStatus(false);
    }
    goToPage(pageType) {
        this.utilService.ScrollToTop();
        this.router.navigate([pageType]);
    }
    // gotoPaymentModule() {
    //   this.utilService.ScrollToTop();
    //   window.open(ExternalURLs.PAYMENT, '_blank');
    // }
    buyNow() {
        this.utilService.ScrollToTop();
        this.router.navigate([src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_3__["Page"].PACKAGE]);
    }
    refresh() {
        sessionStorage.setItem('isLoadedOnce', 'true');
        window.location.reload();
    }
    paymentStauts_From_Session() {
        return sessionStorage.getItem('payment') && sessionStorage.getItem('signature');
    }
}
VideosListComponent.ɵfac = function VideosListComponent_Factory(t) { return new (t || VideosListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_videos_service__WEBPACK_IMPORTED_MODULE_5__["VideosService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_util_util_service__WEBPACK_IMPORTED_MODULE_7__["UtilService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_8__["AuthService"])); };
VideosListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: VideosListComponent, selectors: [["app-videos-list"]], decls: 94, vars: 6, consts: [[1, "container", "videoDiv"], [1, "row"], [1, "wave"], ["id", "carouselExampleIndicators", "data-ride", "carousel", 1, "carousel", "slide"], [1, "carousel-indicators"], ["data-target", "#carouselExampleIndicators", "data-slide-to", "0", 1, "active"], ["data-target", "#carouselExampleIndicators", "data-slide-to", "1"], ["data-target", "#carouselExampleIndicators", "data-slide-to", "2"], ["data-target", "#carouselExampleIndicators", "data-slide-to", "3"], ["data-target", "#carouselExampleIndicators", "data-slide-to", "4"], ["data-target", "#carouselExampleIndicators", "data-slide-to", "5"], [1, "carousel-inner"], [1, "carousel-item", "active"], ["data-aos", "zoom-in-up", 1, "carousel-caption", "d-md-block"], [1, "carousel-caption", "d-md-block"], ["title", "About", 1, "btn", 3, "click"], [1, "carousel-item", "sld2"], [1, "carousel-item", "sld4"], [1, "carousel-item", "sld1"], [1, "carousel-item", "sld3"], [1, "carousel-item", "sld5"], ["title", "", 1, "btn", 3, "click"], ["href", "#carouselExampleIndicators", "role", "button", "data-slide", "prev", 1, "carousel-control-prev"], ["aria-hidden", "true", 1, "carousel-control-prev-icon"], [1, "sr-only"], ["href", "#carouselExampleIndicators", "role", "button", "data-slide", "next", 1, "carousel-control-next"], ["aria-hidden", "true", 1, "carousel-control-next-icon"], [1, "curve"], [1, "trend"], [1, "serviceDiv", "text-center"], [1, "text-center"], ["class", "no-access", 4, "ngIf"], ["style", "text-align: center;color: #f0ab18;", 4, "ngIf"], ["fxLayout", "row wrap", "fxLayout.xs", "column", "fxLayoutAlign", "space-evenly center", 1, "example-sidenav-content"], [4, "ngIf"], ["data-aos", "zoom-in-up", "class", "card", 4, "ngFor", "ngForOf"], [1, "trending"], [1, "no-access"], ["src", "./assets/images/access-denaid.png", "alt", "access-denaid"], [2, "font-weight", "bold"], [1, "btn", 3, "click"], [2, "text-align", "center", "color", "#f0ab18"], ["data-aos", "zoom-in-up", 1, "card"], ["alt", "Card image cap", 1, "card-img-top", 3, "src"], [1, "card-body"], [1, "card-title"], [1, "card-play", 3, "click"], [1, "btn"], ["aria-hidden", "true", 1, "fa", "fa-play"]], template: function VideosListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "ol", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "li", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "li", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Welcome to ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "NinthSem");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "We are here to help engineering aspirants of core industries graduate with industry-ready skillsets. And oh we help build perspectives too!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VideosListComponent_Template_button_click_23_listener() { return ctx.goToPage(ctx.Page.ABOUT); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "About us");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Welcome to ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Mechanical Engineering");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "We are here to help engineering aspirants of core industries graduate with industry-ready skillsets. And oh we help build perspectives too!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Welcome to ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Electrical Engineering");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "We are here to help engineering aspirants of core industries graduate with industry-ready skillsets. And oh we help build perspectives too!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Welcome to ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Chemical Engineering");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "We are here to help engineering aspirants of core industries graduate with industry-ready skillsets. And oh we help build perspectives too!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Welcome to ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Metallurgy Engineering");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "We are here to help engineering aspirants of core industries graduate with industry-ready skillsets. And oh we help build perspectives too!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "You are in the right place");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "we will provide you with the necessary skillsets and make you industry-ready. Our Subject Matter Experts come with years of experience and technical understanding. They will guide you, teach you and make sure you are all ready to take that leap into the industry. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "button", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VideosListComponent_Template_button_click_64_listener() { return ctx.goToPage(ctx.Page.CONTACT); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "Contact us!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "span", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "span", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, "Previous");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "a", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "span", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "span", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Next");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "h2", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, "Certification Course On Industry Module");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](82, VideosListComponent_div_82_Template, 9, 0, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](83, VideosListComponent_p_83_Template, 2, 0, "p", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](85, VideosListComponent_mat_spinner_85_Template, 1, 0, "mat-spinner", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](86, VideosListComponent_div_86_Template, 9, 2, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](90, "CHECKOUT OUR VIDEOS ON ALL BRANCHES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](92, VideosListComponent_div_92_Template, 9, 2, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](93, "app-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](79);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.texts.title ? ctx.texts.title : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isBranch);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.masterObj.length == 0 && ctx.isBranch);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.masterObj.length == 0 && ctx.isBranch);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.masterObj);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.demoMasterObject);
    } }, directives: [_component_header_header_component__WEBPACK_IMPORTED_MODULE_9__["HeaderComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__["DefaultLayoutAlignDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"], _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_12__["FooterComponent"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__["MatSpinner"]], styles: [".container[_ngcontent-%COMP%]{\r\n  margin: 0;\r\n  padding: 0;\r\n  display: block;\r\n}\r\n\r\n\r\n.container[_ngcontent-%COMP%] {\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n\r\n.wave[_ngcontent-%COMP%] {\r\n    height: 100vh;\r\n    width: 100vw;\r\n}\r\n\r\n\r\n.carousel-item[_ngcontent-%COMP%]{\r\n  height:100vh;\r\n  width: 100%;\r\n  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/assets/images/carousel/land.jpg');\r\n  background-position: center;\r\n    background-size: cover;\r\n}\r\n\r\n\r\n.sld[_ngcontent-%COMP%]{\r\n  height:100vh;\r\n  width: 100%;\r\n  background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/ninthsem/\\\\');\r\n  background-position: center;\r\n    background-size: cover;\r\n}\r\n\r\n\r\n.sld1[_ngcontent-%COMP%]{\r\n  height:100vh;\r\n  width: 100%;\r\n  background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/carousel/chem.jpg');\r\n  background-position: center;\r\n    background-size: cover;\r\n}\r\n\r\n\r\n.sld2[_ngcontent-%COMP%]{\r\n  height:100vh;\r\n  width: 100%;\r\n  background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/carousel/mech.jpg');\r\n  background-position: center;\r\n    background-size: cover;\r\n}\r\n\r\n\r\n.sld3[_ngcontent-%COMP%]{\r\n  height:100vh;\r\n  width: 100%;\r\n  background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/carousel/met.jpg');\r\n  background-position: center;\r\n    background-size: cover;\r\n}\r\n\r\n\r\n.sld4[_ngcontent-%COMP%]{\r\n  height:100vh;\r\n  width: 100%;\r\n  background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/carousel/civ.jpg');\r\n  background-position: center;\r\n    background-size: cover;\r\n}\r\n\r\n\r\n.sld5[_ngcontent-%COMP%]{\r\n  height:100vh;\r\n  width: 100%;\r\n  background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/carousel/right.jpg');\r\n  background-position: center;\r\n    background-size: cover;\r\n}\r\n\r\n\r\n.carousel-caption[_ngcontent-%COMP%] {\r\npadding-bottom: 20%;\r\n}\r\n\r\n\r\n.carousel-caption[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{\r\nfont-size: 4rem;\r\nmin-height: 3rem;\r\nfont-weight: 550;\r\ncolor:white;\r\nline-height: 1.15;\r\n}\r\n\r\n\r\n.carousel-caption[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{\r\nfont-size: 5rem;\r\ncolor: #f0ab18;\r\nmargin: 1rem;\r\npadding-left: 0px;\r\n}\r\n\r\n\r\n.carousel-caption[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .carousel-caption[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{\r\n  display: inline-block;\r\n}\r\n\r\n\r\n.carousel-caption[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\nfont-size: 2rem;\r\nfont-weight: 400;\r\ncolor: white;\r\n}\r\n\r\n\r\n.carousel-caption[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\nheight: 7rem;\r\nwidth: auto;\r\n}\r\n\r\n\r\n.carousel-caption[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{\r\n    font-family: \"Raleway\", sans-serif;\r\n    font-size: 14px;\r\n    background: #f0ab18;\r\n    color: #fff;\r\n    border-radius: 50px;\r\n    padding: 10px 56px;\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n.carousel-caption[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover{\r\n  background-color: #9babab;\r\n}\r\n\r\n\r\n.curve[_ngcontent-%COMP%] {\r\n    width: 100vw;\r\n    height: auto;\r\n   \r\n}\r\n\r\n\r\n.serviceDiv[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  align-items: center;\r\n  margin-top: 5rem;\r\n  font-size: 32px;\r\n}\r\n\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before, .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::after {\r\n  content: '';\r\n  width: 50px;\r\n  height: 2px;\r\n  margin: 1rem;\r\n  background: #f0ab18;\r\n  display: inline-block;\r\n}\r\n\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  font-weight: bold;\r\n  padding: 0.3%;\r\n  font-size: 32px;\r\n}\r\n\r\n\r\n.carousel-inner[_ngcontent-%COMP%]{\r\nheight: 100vh;\r\n}\r\n\r\n\r\n.banner[_ngcontent-%COMP%]{\r\n  background-size: cover;\r\n}\r\n\r\n\r\n.card-play[_ngcontent-%COMP%]{\r\n  width: 100%;\r\n  \r\n  border-radius: 25px;\r\n  background-color: #f0ab18;\r\n}\r\n\r\n\r\n.card-play[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n  width: 100%;\r\n  font-size: 15px;\r\n  border-radius: 5px;\r\n}\r\n\r\n\r\n.card-play[_ngcontent-%COMP%]:hover{\r\n  background-color:  #f0ab18;\r\n}\r\n\r\n\r\n.content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    position: relative;\r\n    margin-top: 0;\r\n    z-index: 1;\r\n}\r\n\r\n\r\n.content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    right: 3rem;\r\n    top: 5rem;\r\n}\r\n\r\n\r\n.slider[_ngcontent-%COMP%] {\r\n    display: inline-flex;\r\n    width: 100%;\r\n    margin: 5rem auto;\r\n}\r\n\r\n\r\n.content[_ngcontent-%COMP%] {\r\n    margin: 2rem;\r\n    max-width: 70%;\r\n}\r\n\r\n\r\n.content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    margin: 3rem auto;\r\n    font-size: 4rem;\r\n    font-weight: 800;\r\n    background: linear-gradient(to right, red, blue);\r\n    -webkit-text-fill-color: transparent;\r\n    -webkit-background-clip: text;\r\n}\r\n\r\n\r\n.no-access[_ngcontent-%COMP%]{\r\n  text-align: center;\r\n}\r\n\r\n\r\n.no-access[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{\r\n  font-size: 2rem;\r\n  color: red;\r\n  margin: 1rem;\r\n}\r\n\r\n\r\n.no-access[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\r\n font-family: \"Raleway\", sans-serif;\r\n    font-size: 14px;\r\n    background: #f0ab18;\r\n    color: #fff;\r\n    border-radius: 50px;\r\n    padding: 10px 56px;\r\n    cursor: pointer;\r\n\r\n}\r\n\r\n\r\np[_ngcontent-%COMP%] {\r\n    font-size: 2rem;\r\n    font-weight: 500;\r\n}\r\n\r\n\r\n.example-card[_ngcontent-%COMP%] {\r\n    height: 34rem;\r\n    width: 35rem;\r\n    background-image: linear-gradient(#9babab, #f0ab18);\r\n    border-radius: 2rem;\r\n    margin: 1rem;\r\n}\r\n\r\n\r\n.example-header-image[_ngcontent-%COMP%] {\r\n    background-size: cover;\r\n}\r\n\r\n\r\nbutton[_ngcontent-%COMP%] {\r\n    color: white;\r\n}\r\n\r\n\r\n.example-card1[_ngcontent-%COMP%] {\r\n    height: 34rem;\r\n    width: 35rem;\r\n    background-image: linear-gradient(#9babab, #f0ab18);\r\n    margin: 1rem;\r\n    border-radius: 2rem;\r\n}\r\n\r\n\r\n.example-card2[_ngcontent-%COMP%] {\r\n    height: 34rem;\r\n    width: 28rem;\r\n    background-image: linear-gradient(#b9c7c7, #f0ab18);\r\n    margin: 1rem;\r\n    border-radius: 2rem;\r\n}\r\n\r\n\r\nmat-icon[_ngcontent-%COMP%] {\r\n    margin-right: 1rem;\r\n    color: rgb(37, 95, 219);\r\n    margin-left: 1rem;\r\n}\r\n\r\n\r\nmat-card[_ngcontent-%COMP%] {\r\n    z-index: 5;\r\n}\r\n\r\n\r\n.btnn[_ngcontent-%COMP%] {\r\n    margin-top: 0;\r\n    font-size: 2rem;\r\n    color: black;\r\n}\r\n\r\n\r\n.trend[_ngcontent-%COMP%] {\r\n    height: -webkit-fit-content;\r\n    height: -moz-fit-content;\r\n    height: fit-content;\r\n    width: 100%;\r\n    margin: 6rem auto;\r\n    z-index: 6;\r\n}\r\n\r\n\r\n.trend[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  \r\n  background: linear-gradient(to right, rgb(110, 7, 7), rgb(36, 36, 243));\r\n  -webkit-text-fill-color: transparent;\r\n  -webkit-background-clip: text;\r\n    font-size: 3rem;\r\n    font-weight: 700;\r\n    margin-left: 3rem;\r\n}\r\n\r\n\r\n.latest[_ngcontent-%COMP%] {\r\n    display: inline-flex;\r\n    width: 100%;\r\n    overflow-y: hidden;\r\n    list-style: none;\r\n}\r\n\r\n\r\nmat-sidenav-container[_ngcontent-%COMP%] {\r\n    height: 100%;\r\n    width: 100%;\r\n    background: none;\r\n    z-index: 999;\r\n}\r\n\r\n\r\nmat-sidenav[_ngcontent-%COMP%], mat-sidenav-content[_ngcontent-%COMP%] {\r\n    padding: 4rem;\r\n}\r\n\r\n\r\n.trending[_ngcontent-%COMP%] {\r\n    display: inline-flex;\r\n    width: 100%;\r\n    overflow-y: hidden;\r\n    overflow-x: scroll;\r\n    scroll-behavior: unset;\r\n  }\r\n\r\n\r\nimg[_ngcontent-%COMP%]{\r\n    width: 20rem;\r\n\r\n}\r\n\r\n\r\n.btnn[_ngcontent-%COMP%] {\r\n  margin-top: 0;\r\n  font-size: 2rem;\r\n  color: black;\r\n}\r\n\r\n\r\n.trend[_ngcontent-%COMP%] {\r\n  height: -webkit-fit-content;\r\n  height: -moz-fit-content;\r\n  height: fit-content;\r\n  width: 100%;\r\n    margin: 6rem auto;\r\n    z-index: 6;\r\n  }\r\n\r\n\r\nh2[_ngcontent-%COMP%] {\r\n    font-size: 3rem;\r\n    font-weight: 700;\r\n    margin-left: 3rem;\r\n}\r\n\r\n\r\n.latest[_ngcontent-%COMP%] {\r\n    display: inline-flex;\r\n    width: 100%;\r\n    overflow-y: hidden;\r\n    list-style: none;\r\n}\r\n\r\n\r\nmat-sidenav-container[_ngcontent-%COMP%] {\r\n    height: 100%;\r\n    width: 100%;\r\n    background: none;\r\n    z-index: 999;\r\n}\r\n\r\n\r\nmat-sidenav[_ngcontent-%COMP%], mat-sidenav-content[_ngcontent-%COMP%] {\r\n    padding: 4rem;\r\n}\r\n\r\n\r\nmat-sidenav[_ngcontent-%COMP%] {\r\n    background-image: linear-gradient( #f0ab18, #b9c7c7);\r\n    width: 35rem;\r\n    position: fixed;\r\n}\r\n\r\n\r\nmat-selection-list[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n}\r\n\r\n\r\nmat-list-option[_ngcontent-%COMP%] {\r\n    height: 5rem;\r\n    margin-bottom: 1rem;\r\n    text-overflow: clip;\r\n    font-size: 3rem;\r\n    font-weight: 500;\r\n    color: black;\r\n}\r\n\r\n\r\n.clear[_ngcontent-%COMP%] {\r\n    align-items: right;\r\n    margin-left: 18rem;\r\n}\r\n\r\n\r\n.ytp-chrome-top-buttons[_ngcontent-%COMP%] {\r\n    display: hidden;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n.reportDiv[_ngcontent-%COMP%] {\r\n    width: 60%;\r\n    margin-left: 30%;\r\n    margin-top: -30px;\r\n}\r\n\r\n\r\n.card[_ngcontent-%COMP%] {\r\n    border-radius: 8px;\r\n    max-height: 370px;\r\n    min-height: 370px;\r\n    max-width: 300px;\r\n    min-width: 300px;\r\n    margin-top: 30px;\r\n    \r\n    height: 60rem;\r\n    width: 50rem;\r\n    margin: 1rem;\r\n    overflow: hidden;\r\n    transition: ease-in 0.4s;\r\n\r\n}\r\n\r\n\r\n.card[_ngcontent-%COMP%]:hover {\r\n  transform: scale(0.9);\r\n  cursor: pointer;\r\n}\r\n\r\n\r\n.card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n    display: block;\r\n    text-align: center;\r\n    border-bottom: 1px solid rgb(77, 52, 52);\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px;\r\n  }\r\n\r\n\r\n.card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    padding-top: 15px;\r\n}\r\n\r\n\r\n.card-title[_ngcontent-%COMP%]{\r\nfont-weight: 500;\r\nheight: 70px;\r\nmax-height: 80px;\r\noverflow: hidden;\r\n}\r\n\r\n\r\n.card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  border-radius: 8px;\r\n}\r\n\r\n\r\n.card-body[_ngcontent-%COMP%] {\r\n    border-bottom-left-radius: 5px;\r\n    border-bottom-right-radius: 5px;\r\n}\r\n\r\n\r\n.card-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n    font-weight: bold;\r\n    font-size: 15px;\r\n}\r\n\r\n\r\n.mockHeading[_ngcontent-%COMP%] {\r\n    display: block;\r\n    width: 70%;\r\n    margin-left: 10%;\r\n    max-height: 100px;\r\n    background: #f0ab18;\r\n    text-align: center;\r\n}\r\n\r\n\r\n.mockHeading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .mockHeading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    padding-top: 1%;\r\n    padding-bottom: 1%;\r\n}\r\n\r\n\r\n.mockCard[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    max-height: 300px;\r\n    min-width: 210px;\r\n    max-width: 210px;\r\n    margin-left: 5%;\r\n}\r\n\r\n\r\n.mockCard[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    display: block;\r\n    width: 80%;\r\n    margin-left: 10%;\r\n    background: green;\r\n    font-size: 14px;\r\n    text-align: center;\r\n}\r\n\r\n\r\n.carousel-caption[_ngcontent-%COMP%] {\r\n  z-index: auto !important;\r\n}\r\n\r\n\r\n@media (max-width: 1200px){\r\n  .carousel-caption[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .carousel-caption[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{\r\n    display: block;\r\n  }\r\n}\r\n\r\n\r\n@media (min-width: 375px) and (max-width: 680px){\r\n  .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .serviceDiv[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{\r\n     font-size: 70%;\r\n  }\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before, .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::after{\r\n  width: 30px;\r\n}\r\n}\r\n\r\n\r\n@media (max-width: 374px){\r\n  .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .serviceDiv[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{\r\n     font-size: 60%;\r\n\r\n  }\r\n  .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before, .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::after{\r\n  width: 25px;\r\n}\r\n.sld1[_ngcontent-%COMP%]   .carousel-caption[_ngcontent-%COMP%]{\r\n  padding-top: 1000px;\r\n}\r\n.carousel-caption[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{\r\n  font-style: 25px;\r\n}\r\n}\r\n\r\n\r\ndiv.wh-widget-send-button-wrapper[_ngcontent-%COMP%]{\r\nmargin: 0;\r\npadding: 0;\r\nmargin-left: 2rem;\r\nmargin-bottom: 1rem;\r\nborder: 0;\r\nposition: fixed;\r\nz-index: 16000160;\r\nbottom: 0;\r\ntext-align: center;\r\noverflow: hidden;\r\nheight: 70px;\r\nwidth: 70px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC92aWRlby92aWRlb3MtbGlzdC92aWRlb3MtbGlzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1YsY0FBYztBQUNoQjs7O0FBR0E7SUFDSSxTQUFTO0lBQ1QsVUFBVTtBQUNkOzs7QUFFQTtJQUNJLGFBQWE7SUFDYixZQUFZO0FBQ2hCOzs7QUFDQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsaUhBQWlIO0VBQ2pILDJCQUEyQjtJQUN6QixzQkFBc0I7QUFDMUI7OztBQUNBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCw2RkFBNkY7RUFDN0YsMkJBQTJCO0lBQ3pCLHNCQUFzQjtBQUMxQjs7O0FBQ0E7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGlIQUFpSDtFQUNqSCwyQkFBMkI7SUFDekIsc0JBQXNCO0FBQzFCOzs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsaUhBQWlIO0VBQ2pILDJCQUEyQjtJQUN6QixzQkFBc0I7QUFDMUI7OztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxnSEFBZ0g7RUFDaEgsMkJBQTJCO0lBQ3pCLHNCQUFzQjtBQUMxQjs7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGdIQUFnSDtFQUNoSCwyQkFBMkI7SUFDekIsc0JBQXNCO0FBQzFCOzs7QUFHQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsa0hBQWtIO0VBQ2xILDJCQUEyQjtJQUN6QixzQkFBc0I7QUFDMUI7OztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25COzs7QUFDQTtBQUNBLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsZ0JBQWdCO0FBQ2hCLFdBQVc7QUFDWCxpQkFBaUI7QUFDakI7OztBQUNBO0FBQ0EsZUFBZTtBQUNmLGNBQWM7QUFDZCxZQUFZO0FBQ1osaUJBQWlCO0FBQ2pCOzs7QUFDQTtFQUNFLHFCQUFxQjtBQUN2Qjs7O0FBQ0E7QUFDQSxlQUFlO0FBQ2YsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWjs7O0FBQ0E7QUFDQSxZQUFZO0FBQ1osV0FBVztBQUNYOzs7QUFDQTtJQUNJLGtDQUFrQztJQUNsQyxlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGVBQWU7QUFDbkI7OztBQUNBO0VBQ0UseUJBQXlCO0FBQzNCOzs7QUFDQTtJQUNJLFlBQVk7SUFDWixZQUFZOztBQUVoQjs7O0FBQ0E7RUFDRSxXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixlQUFlO0FBQ2pCOzs7QUFFQTs7RUFFRSxXQUFXO0VBQ1gsV0FBVztFQUNYLFdBQVc7RUFDWCxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLHFCQUFxQjtBQUN2Qjs7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixlQUFlO0FBQ2pCOzs7QUFDQTtBQUNBLGFBQWE7QUFDYjs7O0FBQ0E7RUFFRSxzQkFBc0I7QUFDeEI7OztBQUNBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIseUJBQXlCO0FBQzNCOzs7QUFDQTtFQUNFLFdBQVc7RUFDWCxlQUFlO0VBQ2Ysa0JBQWtCO0FBQ3BCOzs7QUFDQTtFQUNFLDBCQUEwQjtBQUM1Qjs7O0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLFVBQVU7QUFDZDs7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFNBQVM7QUFDYjs7O0FBRUE7SUFDSSxvQkFBb0I7SUFDcEIsV0FBVztJQUNYLGlCQUFpQjtBQUNyQjs7O0FBRUE7SUFDSSxZQUFZO0lBQ1osY0FBYztBQUNsQjs7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixnREFBZ0Q7SUFDaEQsb0NBQW9DO0lBQ3BDLDZCQUE2QjtBQUNqQzs7O0FBQ0E7RUFDRSxrQkFBa0I7QUFDcEI7OztBQUNBO0VBQ0UsZUFBZTtFQUNmLFVBQVU7RUFDVixZQUFZO0FBQ2Q7OztBQUNBO0NBQ0Msa0NBQWtDO0lBQy9CLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsZUFBZTs7QUFFbkI7OztBQUNBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLG1EQUFtRDtJQUNuRCxtQkFBbUI7SUFDbkIsWUFBWTtBQUNoQjs7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7OztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLG1EQUFtRDtJQUNuRCxZQUFZO0lBQ1osbUJBQW1CO0FBQ3ZCOzs7QUFFQTtJQUNJLGFBQWE7SUFDYixZQUFZO0lBQ1osbURBQW1EO0lBQ25ELFlBQVk7SUFDWixtQkFBbUI7QUFDdkI7OztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLHVCQUF1QjtJQUN2QixpQkFBaUI7QUFDckI7OztBQUVBO0lBQ0ksVUFBVTtBQUNkOzs7QUFFQTtJQUNJLGFBQWE7SUFDYixlQUFlO0lBQ2YsWUFBWTtBQUNoQjs7O0FBRUE7SUFDSSwyQkFBbUI7SUFBbkIsd0JBQW1CO0lBQW5CLG1CQUFtQjtJQUNuQixXQUFXO0lBQ1gsaUJBQWlCO0lBQ2pCLFVBQVU7QUFDZDs7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsdUVBQXVFO0VBQ3ZFLG9DQUFvQztFQUNwQyw2QkFBNkI7SUFDM0IsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7OztBQUVBO0lBQ0ksb0JBQW9CO0lBQ3BCLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsZ0JBQWdCO0FBQ3BCOzs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLFlBQVk7QUFDaEI7OztBQUVBOztJQUVJLGFBQWE7QUFDakI7OztBQUVBO0lBQ0ksb0JBQW9CO0lBQ3BCLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLHNCQUFzQjtFQUN4Qjs7O0FBRUE7SUFDRSxZQUFZOztBQUVoQjs7O0FBQ0E7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLFlBQVk7QUFDZDs7O0FBRUE7RUFDRSwyQkFBbUI7RUFBbkIsd0JBQW1CO0VBQW5CLG1CQUFtQjtFQUNuQixXQUFXO0lBQ1QsaUJBQWlCO0lBQ2pCLFVBQVU7RUFDWjs7O0FBRUE7SUFDRSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7O0FBRUE7SUFDSSxvQkFBb0I7SUFDcEIsV0FBVztJQUNYLGtCQUFrQjtJQUNsQixnQkFBZ0I7QUFDcEI7OztBQUVBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsWUFBWTtBQUNoQjs7O0FBRUE7O0lBRUksYUFBYTtBQUNqQjs7O0FBRUE7SUFDSSxvREFBb0Q7SUFDcEQsWUFBWTtJQUNaLGVBQWU7QUFDbkI7OztBQUVBO0lBQ0ksV0FBVztBQUNmOzs7QUFFQTtJQUNJLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsWUFBWTtBQUNoQjs7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCOzs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7OztBQUdBLFNBQVM7OztBQUVUO0lBQ0ksVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7OztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsNkJBQTZCO0lBQzdCLGFBQWE7SUFDYixZQUFZO0lBQ1osWUFBWTtJQUNaLGdCQUFnQjtJQUNoQix3QkFBd0I7O0FBRTVCOzs7QUFDQTtFQUNFLHFCQUFxQjtFQUNyQixlQUFlO0FBQ2pCOzs7QUFHQTtJQUNJLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsd0NBQXdDO0lBQ3hDLDJCQUEyQjtJQUMzQiw0QkFBNEI7RUFDOUI7OztBQUVGO0lBQ0ksaUJBQWlCO0FBQ3JCOzs7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixZQUFZO0FBQ1osZ0JBQWdCO0FBQ2hCLGdCQUFnQjtBQUNoQjs7O0FBQ0E7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCOzs7QUFFQTtJQUNJLDhCQUE4QjtJQUM5QiwrQkFBK0I7QUFDbkM7OztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLG9CQUFvQjtJQUNwQixpQkFBaUI7SUFDakIsZUFBZTtBQUNuQjs7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLGtCQUFrQjtBQUN0Qjs7O0FBRUE7O0lBRUksZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZUFBZTtBQUNuQjs7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7OztBQUNBO0VBQ0U7SUFDRSxjQUFjO0VBQ2hCO0FBQ0Y7OztBQUVBO0VBQ0U7S0FDRyxjQUFjO0VBQ2pCOztBQUVGOztFQUVFLFdBQVc7QUFDYjtBQUNBOzs7QUFDQTtFQUNFO0tBQ0csY0FBYzs7RUFFakI7RUFDQTs7RUFFQSxXQUFXO0FBQ2I7QUFDQTtFQUNFLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBQ0E7OztBQUNBO0FBQ0EsU0FBUztBQUNULFVBQVU7QUFDVixpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25CLFNBQVM7QUFDVCxlQUFlO0FBQ2YsaUJBQWlCO0FBQ2pCLFNBQVM7QUFDVCxrQkFBa0I7QUFDbEIsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWixXQUFXO0FBQ1giLCJmaWxlIjoic3JjL2FwcC9wYWdlQ29tcG9uZW50L3ZpZGVvL3ZpZGVvcy1saXN0L3ZpZGVvcy1saXN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmNvbnRhaW5lcntcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuXHJcbi5jb250YWluZXIge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG5cclxuLndhdmUge1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuICAgIHdpZHRoOiAxMDB2dztcclxufVxyXG4uY2Fyb3VzZWwtaXRlbXtcclxuICBoZWlnaHQ6MTAwdmg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHJnYmEoMCwgMCwgMCwgMC41KSwgcmdiYSgwLCAwLCAwLCAwLjUpKSx1cmwoJy9hc3NldHMvaW1hZ2VzL2Nhcm91c2VsL2xhbmQuanBnJyk7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxufVxyXG4uc2xke1xyXG4gIGhlaWdodDoxMDB2aDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMC41KSksIHVybCgnL25pbnRoc2VtL1xcXFwnKTtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG59XHJcbi5zbGQxe1xyXG4gIGhlaWdodDoxMDB2aDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMC41KSksIHVybCgnL2Fzc2V0cy9pbWFnZXMvY2Fyb3VzZWwvY2hlbS5qcGcnKTtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG59XHJcblxyXG4uc2xkMntcclxuICBoZWlnaHQ6MTAwdmg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQocmdiYSgwLCAwLCAwLCAwLjUpLCByZ2JhKDAsIDAsIDAsIDAuNSkpLCB1cmwoJy9hc3NldHMvaW1hZ2VzL2Nhcm91c2VsL21lY2guanBnJyk7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxufVxyXG5cclxuLnNsZDN7XHJcbiAgaGVpZ2h0OjEwMHZoO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHJnYmEoMCwgMCwgMCwgMC41KSwgcmdiYSgwLCAwLCAwLCAwLjUpKSwgdXJsKCcvYXNzZXRzL2ltYWdlcy9jYXJvdXNlbC9tZXQuanBnJyk7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxufVxyXG5cclxuLnNsZDR7XHJcbiAgaGVpZ2h0OjEwMHZoO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHJnYmEoMCwgMCwgMCwgMC41KSwgcmdiYSgwLCAwLCAwLCAwLjUpKSwgdXJsKCcvYXNzZXRzL2ltYWdlcy9jYXJvdXNlbC9jaXYuanBnJyk7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxufVxyXG5cclxuXHJcbi5zbGQ1e1xyXG4gIGhlaWdodDoxMDB2aDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMC41KSksIHVybCgnL2Fzc2V0cy9pbWFnZXMvY2Fyb3VzZWwvcmlnaHQuanBnJyk7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxufSBcclxuXHJcbi5jYXJvdXNlbC1jYXB0aW9uIHtcclxucGFkZGluZy1ib3R0b206IDIwJTtcclxufVxyXG4uY2Fyb3VzZWwtY2FwdGlvbiBoM3tcclxuZm9udC1zaXplOiA0cmVtO1xyXG5taW4taGVpZ2h0OiAzcmVtO1xyXG5mb250LXdlaWdodDogNTUwO1xyXG5jb2xvcjp3aGl0ZTtcclxubGluZS1oZWlnaHQ6IDEuMTU7XHJcbn1cclxuLmNhcm91c2VsLWNhcHRpb24gc3BhbntcclxuZm9udC1zaXplOiA1cmVtO1xyXG5jb2xvcjogI2YwYWIxODtcclxubWFyZ2luOiAxcmVtO1xyXG5wYWRkaW5nLWxlZnQ6IDBweDtcclxufVxyXG4uY2Fyb3VzZWwtY2FwdGlvbiBoMywuY2Fyb3VzZWwtY2FwdGlvbiBoMyBzcGFue1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG4uY2Fyb3VzZWwtY2FwdGlvbiBwe1xyXG5mb250LXNpemU6IDJyZW07XHJcbmZvbnQtd2VpZ2h0OiA0MDA7XHJcbmNvbG9yOiB3aGl0ZTtcclxufVxyXG4uY2Fyb3VzZWwtY2FwdGlvbiBpbWd7XHJcbmhlaWdodDogN3JlbTtcclxud2lkdGg6IGF1dG87XHJcbn1cclxuLmNhcm91c2VsLWNhcHRpb24gLmJ0bntcclxuICAgIGZvbnQtZmFtaWx5OiBcIlJhbGV3YXlcIiwgc2Fucy1zZXJpZjtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGJhY2tncm91bmQ6ICNmMGFiMTg7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDU2cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLmNhcm91c2VsLWNhcHRpb24gLmJ0bjpob3ZlcntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWJhYmFiO1xyXG59XHJcbi5jdXJ2ZSB7XHJcbiAgICB3aWR0aDogMTAwdnc7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgIFxyXG59XHJcbi5zZXJ2aWNlRGl2IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi10b3A6IDVyZW07XHJcbiAgZm9udC1zaXplOiAzMnB4O1xyXG59XHJcblxyXG4uc2VydmljZURpdiBoMTo6YmVmb3JlLFxyXG4uc2VydmljZURpdiBoMTo6YWZ0ZXIge1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIHdpZHRoOiA1MHB4O1xyXG4gIGhlaWdodDogMnB4O1xyXG4gIG1hcmdpbjogMXJlbTtcclxuICBiYWNrZ3JvdW5kOiAjZjBhYjE4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLnNlcnZpY2VEaXYgaDEge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBwYWRkaW5nOiAwLjMlO1xyXG4gIGZvbnQtc2l6ZTogMzJweDtcclxufVxyXG4uY2Fyb3VzZWwtaW5uZXJ7XHJcbmhlaWdodDogMTAwdmg7XHJcbn1cclxuLmJhbm5lcntcclxuICAtd2Via2l0LWJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxufVxyXG4uY2FyZC1wbGF5e1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIC8qIGhlaWdodDogNHJlbTsgKi9cclxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGFiMTg7XHJcbn1cclxuLmNhcmQtcGxheSBhe1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuLmNhcmQtcGxheTpob3ZlcntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAgI2YwYWIxODtcclxufVxyXG4uY29udGVudCBoMSB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBtYXJnaW4tdG9wOiAwO1xyXG4gICAgei1pbmRleDogMTtcclxufVxyXG5cclxuLmNvbnRlbnQgaW1nIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHJpZ2h0OiAzcmVtO1xyXG4gICAgdG9wOiA1cmVtO1xyXG59XHJcblxyXG4uc2xpZGVyIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW46IDVyZW0gYXV0bztcclxufVxyXG5cclxuLmNvbnRlbnQge1xyXG4gICAgbWFyZ2luOiAycmVtO1xyXG4gICAgbWF4LXdpZHRoOiA3MCU7XHJcbn1cclxuXHJcbi5jb250ZW50IGgxIHtcclxuICAgIG1hcmdpbjogM3JlbSBhdXRvO1xyXG4gICAgZm9udC1zaXplOiA0cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmVkLCBibHVlKTtcclxuICAgIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xyXG59XHJcbi5uby1hY2Nlc3N7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5uby1hY2Nlc3MgaDN7XHJcbiAgZm9udC1zaXplOiAycmVtO1xyXG4gIGNvbG9yOiByZWQ7XHJcbiAgbWFyZ2luOiAxcmVtO1xyXG59XHJcbi5uby1hY2Nlc3MgLmJ0biB7XHJcbiBmb250LWZhbWlseTogXCJSYWxld2F5XCIsIHNhbnMtc2VyaWY7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjBhYjE4O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgcGFkZGluZzogMTBweCA1NnB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG5cclxufVxyXG5wIHtcclxuICAgIGZvbnQtc2l6ZTogMnJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbn1cclxuXHJcbi5leGFtcGxlLWNhcmQge1xyXG4gICAgaGVpZ2h0OiAzNHJlbTtcclxuICAgIHdpZHRoOiAzNXJlbTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgjOWJhYmFiLCAjZjBhYjE4KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJyZW07XHJcbiAgICBtYXJnaW46IDFyZW07XHJcbn1cclxuXHJcbi5leGFtcGxlLWhlYWRlci1pbWFnZSB7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG59XHJcblxyXG5idXR0b24ge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uZXhhbXBsZS1jYXJkMSB7XHJcbiAgICBoZWlnaHQ6IDM0cmVtO1xyXG4gICAgd2lkdGg6IDM1cmVtO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCM5YmFiYWIsICNmMGFiMTgpO1xyXG4gICAgbWFyZ2luOiAxcmVtO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcclxufVxyXG5cclxuLmV4YW1wbGUtY2FyZDIge1xyXG4gICAgaGVpZ2h0OiAzNHJlbTtcclxuICAgIHdpZHRoOiAyOHJlbTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgjYjljN2M3LCAjZjBhYjE4KTtcclxuICAgIG1hcmdpbjogMXJlbTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJyZW07XHJcbn1cclxuXHJcbm1hdC1pY29uIHtcclxuICAgIG1hcmdpbi1yaWdodDogMXJlbTtcclxuICAgIGNvbG9yOiByZ2IoMzcsIDk1LCAyMTkpO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XHJcbn1cclxuXHJcbm1hdC1jYXJkIHtcclxuICAgIHotaW5kZXg6IDU7XHJcbn1cclxuXHJcbi5idG5uIHtcclxuICAgIG1hcmdpbi10b3A6IDA7XHJcbiAgICBmb250LXNpemU6IDJyZW07XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi50cmVuZCB7XHJcbiAgICBoZWlnaHQ6IGZpdC1jb250ZW50O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW46IDZyZW0gYXV0bztcclxuICAgIHotaW5kZXg6IDY7XHJcbn1cclxuXHJcbi50cmVuZCBoMiB7XHJcbiAgLyogYmFja2dyb3VuZDogYmxhY2s7ICovXHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2IoMTEwLCA3LCA3KSwgcmdiKDM2LCAzNiwgMjQzKSk7XHJcbiAgLXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xyXG4gICAgZm9udC1zaXplOiAzcmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIG1hcmdpbi1sZWZ0OiAzcmVtO1xyXG59XHJcblxyXG4ubGF0ZXN0IHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICBsaXN0LXN0eWxlOiBub25lO1xyXG59XHJcblxyXG5tYXQtc2lkZW5hdi1jb250YWluZXIge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gICAgei1pbmRleDogOTk5O1xyXG59XHJcblxyXG5tYXQtc2lkZW5hdixcclxubWF0LXNpZGVuYXYtY29udGVudCB7XHJcbiAgICBwYWRkaW5nOiA0cmVtO1xyXG59XHJcblxyXG4udHJlbmRpbmcge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcclxuICAgIHNjcm9sbC1iZWhhdmlvcjogdW5zZXQ7XHJcbiAgfVxyXG5cclxuICBpbWd7XHJcbiAgICB3aWR0aDogMjByZW07XHJcblxyXG59XHJcbi5idG5uIHtcclxuICBtYXJnaW4tdG9wOiAwO1xyXG4gIGZvbnQtc2l6ZTogMnJlbTtcclxuICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi50cmVuZCB7XHJcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcclxuICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbjogNnJlbSBhdXRvO1xyXG4gICAgei1pbmRleDogNjtcclxuICB9XHJcblxyXG4gIGgyIHtcclxuICAgIGZvbnQtc2l6ZTogM3JlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBtYXJnaW4tbGVmdDogM3JlbTtcclxufVxyXG5cclxuLmxhdGVzdCB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcclxufVxyXG5cclxubWF0LXNpZGVuYXYtY29udGFpbmVyIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZDogbm9uZTtcclxuICAgIHotaW5kZXg6IDk5OTtcclxufVxyXG5cclxubWF0LXNpZGVuYXYsXHJcbm1hdC1zaWRlbmF2LWNvbnRlbnQge1xyXG4gICAgcGFkZGluZzogNHJlbTtcclxufVxyXG5cclxubWF0LXNpZGVuYXYge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCAjZjBhYjE4LCAjYjljN2M3KTtcclxuICAgIHdpZHRoOiAzNXJlbTtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxufVxyXG5cclxubWF0LXNlbGVjdGlvbi1saXN0IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG5tYXQtbGlzdC1vcHRpb24ge1xyXG4gICAgaGVpZ2h0OiA1cmVtO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIHRleHQtb3ZlcmZsb3c6IGNsaXA7XHJcbiAgICBmb250LXNpemU6IDNyZW07XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG4uY2xlYXIge1xyXG4gICAgYWxpZ24taXRlbXM6IHJpZ2h0O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDE4cmVtO1xyXG59XHJcblxyXG4ueXRwLWNocm9tZS10b3AtYnV0dG9ucyB7XHJcbiAgICBkaXNwbGF5OiBoaWRkZW47XHJcbn1cclxuXHJcblxyXG4vKlJlcG9ydCovXHJcblxyXG4ucmVwb3J0RGl2IHtcclxuICAgIHdpZHRoOiA2MCU7XHJcbiAgICBtYXJnaW4tbGVmdDogMzAlO1xyXG4gICAgbWFyZ2luLXRvcDogLTMwcHg7XHJcbn1cclxuXHJcbi5jYXJkIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIG1heC1oZWlnaHQ6IDM3MHB4O1xyXG4gICAgbWluLWhlaWdodDogMzcwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xyXG4gICAgbWluLXdpZHRoOiAzMDBweDtcclxuICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgICAvKiBib3JkZXI6IDFweCBzb2xpZCBibGFjazsgKi9cclxuICAgIGhlaWdodDogNjByZW07XHJcbiAgICB3aWR0aDogNTByZW07XHJcbiAgICBtYXJnaW46IDFyZW07XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgdHJhbnNpdGlvbjogZWFzZS1pbiAwLjRzO1xyXG5cclxufVxyXG4uY2FyZDpob3ZlciB7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjkpO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuXHJcbi5jYXJkIHNwYW4ge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiKDc3LCA1MiwgNTIpO1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xyXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDVweDtcclxuICB9XHJcblxyXG4uY2FyZCBzcGFuIGgyIHtcclxuICAgIHBhZGRpbmctdG9wOiAxNXB4O1xyXG59XHJcbi5jYXJkLXRpdGxle1xyXG5mb250LXdlaWdodDogNTAwO1xyXG5oZWlnaHQ6IDcwcHg7XHJcbm1heC1oZWlnaHQ6IDgwcHg7XHJcbm92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuLmNhcmQgaW1nIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbn1cclxuXHJcbi5jYXJkLWJvZHkge1xyXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNXB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLmNhcmQtYm9keSBwIHtcclxuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG5cclxuLm1vY2tIZWFkaW5nIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDcwJTtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMCU7XHJcbiAgICBtYXgtaGVpZ2h0OiAxMDBweDtcclxuICAgIGJhY2tncm91bmQ6ICNmMGFiMTg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5tb2NrSGVhZGluZyBoMixcclxuLm1vY2tIZWFkaW5nIGgxIHtcclxuICAgIHBhZGRpbmctdG9wOiAxJTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxJTtcclxufVxyXG5cclxuLm1vY2tDYXJkIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIG1heC1oZWlnaHQ6IDMwMHB4O1xyXG4gICAgbWluLXdpZHRoOiAyMTBweDtcclxuICAgIG1heC13aWR0aDogMjEwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNSU7XHJcbn1cclxuXHJcbi5tb2NrQ2FyZCAuY2FyZC1ib2R5IGEge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwJTtcclxuICAgIGJhY2tncm91bmQ6IGdyZWVuO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uY2Fyb3VzZWwtY2FwdGlvbiB7XHJcbiAgei1pbmRleDogYXV0byAhaW1wb3J0YW50O1xyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpe1xyXG4gIC5jYXJvdXNlbC1jYXB0aW9uIGgzLC5jYXJvdXNlbC1jYXB0aW9uIGgzIHNwYW57XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiAzNzVweCkgYW5kIChtYXgtd2lkdGg6IDY4MHB4KXtcclxuICAuc2VydmljZURpdiBoMSwuc2VydmljZURpdiBoMntcclxuICAgICBmb250LXNpemU6IDcwJTtcclxuICB9XHJcblxyXG4uc2VydmljZURpdiBoMTo6YmVmb3JlLFxyXG4uc2VydmljZURpdiBoMTo6YWZ0ZXJ7XHJcbiAgd2lkdGg6IDMwcHg7XHJcbn1cclxufVxyXG5AbWVkaWEgKG1heC13aWR0aDogMzc0cHgpe1xyXG4gIC5zZXJ2aWNlRGl2IGgxLC5zZXJ2aWNlRGl2IGgye1xyXG4gICAgIGZvbnQtc2l6ZTogNjAlO1xyXG5cclxuICB9XHJcbiAgLnNlcnZpY2VEaXYgaDE6OmJlZm9yZSxcclxuLnNlcnZpY2VEaXYgaDE6OmFmdGVye1xyXG4gIHdpZHRoOiAyNXB4O1xyXG59XHJcbi5zbGQxIC5jYXJvdXNlbC1jYXB0aW9ue1xyXG4gIHBhZGRpbmctdG9wOiAxMDAwcHg7XHJcbn1cclxuLmNhcm91c2VsLWNhcHRpb24gaDN7XHJcbiAgZm9udC1zdHlsZTogMjVweDtcclxufVxyXG59XHJcbmRpdi53aC13aWRnZXQtc2VuZC1idXR0b24td3JhcHBlcntcclxubWFyZ2luOiAwO1xyXG5wYWRkaW5nOiAwO1xyXG5tYXJnaW4tbGVmdDogMnJlbTtcclxubWFyZ2luLWJvdHRvbTogMXJlbTtcclxuYm9yZGVyOiAwO1xyXG5wb3NpdGlvbjogZml4ZWQ7XHJcbnotaW5kZXg6IDE2MDAwMTYwO1xyXG5ib3R0b206IDA7XHJcbnRleHQtYWxpZ246IGNlbnRlcjtcclxub3ZlcmZsb3c6IGhpZGRlbjtcclxuaGVpZ2h0OiA3MHB4O1xyXG53aWR0aDogNzBweDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](VideosListComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-videos-list',
                templateUrl: './videos-list.component.html',
                styleUrls: ['./videos-list.component.css']
            }]
    }], function () { return [{ type: _videos_service__WEBPACK_IMPORTED_MODULE_5__["VideosService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }, { type: _util_util_service__WEBPACK_IMPORTED_MODULE_7__["UtilService"] }, { type: _component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_8__["AuthService"] }]; }, null); })();


/***/ }),

/***/ "L3jg":
/*!**********************************************************************!*\
  !*** ./src/app/pageComponent/testimonials/testimonials.component.ts ***!
  \**********************************************************************/
/*! exports provided: TestimonialsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestimonialsComponent", function() { return TestimonialsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aos */ "9a8T");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_1__);



class TestimonialsComponent {
    constructor() { }
    ngOnInit() {
        aos__WEBPACK_IMPORTED_MODULE_1__["init"]();
    }
}
TestimonialsComponent.ɵfac = function TestimonialsComponent_Factory(t) { return new (t || TestimonialsComponent)(); };
TestimonialsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TestimonialsComponent, selectors: [["app-testimonials"]], decls: 50, vars: 0, consts: [[1, "container"], ["data-aos", "fade-up", 1, "serviceDiv", "text-center"], [1, "text-dark", "text-center"], ["id", "carouselExampleIndicators", "data-ride", "carousel", 1, "carousel", "slide"], [1, "carousel-indicators", 2, "display", "none"], ["data-target", "#carouselExampleIndicators", "data-slide-to", "0", 1, "active"], ["data-target", "#carouselExampleIndicators", "data-slide-to", "1"], ["data-target", "#carouselExampleIndicators", "data-slide-to", "2"], [1, "carousel-inner"], [1, "carousel-item", "active"], [1, "testimonial-wrap"], [1, "testimonial-item"], ["src", "assets/images/testimonials/testinomialfirst.jpeg", "alt", "", 1, "testimonial-img"], [1, "bx", "bxs-quote-alt-left", "quote-icon-left"], [1, "bx", "bxs-quote-alt-right", "quote-icon-right"], [1, "carousel-item"], ["src", "assets/images/testimonials/testimonials-2.jpg", "alt", "", 1, "testimonial-img"], ["src", "assets/images/testimonials/testimonials-3.jpg", "alt", "", 1, "testimonial-img"], ["href", "#carouselExampleIndicators", "role", "button", "data-slide", "prev", 1, "carousel-control-prev"], ["aria-hidden", "true", 1, "carousel-control-prev-icon"], [1, "sr-only"], ["href", "#carouselExampleIndicators", "role", "button", "data-slide", "next", 1, "carousel-control-next", "text-warning"], ["aria-hidden", "true", 1, "carousel-control-next-icon", "text-warning"]], template: function TestimonialsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "TESTIMONIALS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h2", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "HAVE A LOOK WHAT PEOPLE SAY ABOUT US");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ol", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "img", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Sangram Mohakud");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " I just wanted to share a quick note and let you know that you guys do an outstanding job. I\u2019m glad I decided to be a part of Ninthsem. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "i", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "img", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Shiba Sundar Das");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, " When it comes to studies, there are loads of websites that talk a good game, but Ninthsem will help you make it happen. They have enabled me, coached me, and given me the confidence to achieve my goals. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "i", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "img", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Shradhanjali Sahoo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, " The course covered by me had much information, delivered in concise chunks that were easy to absorb. The Mock Tests were clearer, logical, and effective. But it wasn\u2019t just about the new knowledge. The main benefits came from doing Mock Tests, receiving individual feedback, and interacting with Experts of Ninthsem ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "i", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "span", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Previous");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "a", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "span", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "span", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Next");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["section[_ngcontent-%COMP%] {\r\n    padding: 60px 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.section-bg[_ngcontent-%COMP%] {\r\n    background-color: #f7fbfe;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    padding-bottom: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    font-size: 32px;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n    position: relative;\r\n    color: #222222;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before, .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\r\n    margin: 0 15px 10px 0;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    margin: 0 0 10px 15px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin: 15px 0 0 0;\r\n}\r\n\r\n.testimonial-wrap[_ngcontent-%COMP%] {\r\n    padding-left: 50px;\r\n}\r\n\r\n.testimonial-item[_ngcontent-%COMP%] {\r\n    box-sizing: content-box;\r\n    padding: 30px 30px 30px 60px;\r\n    margin: 30px 15px;\r\n    min-height: 100px;\r\n    box-shadow: 0px 2px 12px #f0ab18;\r\n    position: relative;\r\n    background: #fff;\r\n}\r\n\r\n.testimonial-item[_ngcontent-%COMP%]   .testimonial-img[_ngcontent-%COMP%] {\r\n    width: 90px;\r\n    border-radius: 10px;\r\n    border: 6px solid #fff;\r\n    position: absolute;\r\n    left: -45px;\r\n}\r\n\r\n.testimonial-item[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n    font-size: 18px;\r\n    font-weight: bold;\r\n    margin: 10px 0 5px 0;\r\n    color: #111;\r\n}\r\n\r\n.testimonial-item[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\r\n    font-size: 14px;\r\n    color: #999;\r\n    margin: 0;\r\n}\r\n\r\n.testimonial-item[_ngcontent-%COMP%]   .quote-icon-left[_ngcontent-%COMP%], .testimonial-item[_ngcontent-%COMP%]   .quote-icon-right[_ngcontent-%COMP%] {\r\n    color: #e1f0fa;\r\n    font-size: 26px;\r\n}\r\n\r\n.testimonial-item[_ngcontent-%COMP%]   .quote-icon-left[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    left: -5px;\r\n    position: relative;\r\n}\r\n\r\n.testimonial-item[_ngcontent-%COMP%]   .quote-icon-right[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    right: -5px;\r\n    position: relative;\r\n    top: 10px;\r\n}\r\n\r\n.testimonial-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    font-style: italic;\r\n    margin: 15px auto 15px auto;\r\n}\r\n\r\n.owl-nav[_ngcontent-%COMP%], .owl-dots[_ngcontent-%COMP%] {\r\n    margin-top: 5px;\r\n    text-align: center;\r\n}\r\n\r\n.owl-dot[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    margin: 0 5px;\r\n    width: 12px;\r\n    height: 12px;\r\n    border-radius: 50%;\r\n    background-color: #ddd !important;\r\n}\r\n\r\n.testimonials[_ngcontent-%COMP%]   .owl-dot.active[_ngcontent-%COMP%] {\r\n    background-color: #f0ab18 !important;\r\n}\r\n\r\n@media (max-width: 767px) {\r\n    .testimonials[_ngcontent-%COMP%]   .testimonial-wrap[_ngcontent-%COMP%] {\r\n        padding-left: 0;\r\n    }\r\n    .testimonials[_ngcontent-%COMP%]   .testimonial-item[_ngcontent-%COMP%] {\r\n        padding: 30px;\r\n        margin: 15px;\r\n    }\r\n    .testimonials[_ngcontent-%COMP%]   .testimonial-item[_ngcontent-%COMP%]   .testimonial-img[_ngcontent-%COMP%] {\r\n        position: static;\r\n        left: auto;\r\n    }\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    align-items: center;\r\n    margin-top: 5rem;\r\n    font-size: 32px;\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before, .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    margin: 1rem;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    padding: 0.3%;\r\n    font-size: 32px;\r\n}\r\n\r\n.carousel-control-next-icon[_ngcontent-%COMP%], .carousel-control-prev-icon[_ngcontent-%COMP%]{\r\n    background-color: #222222;\r\n    border-radius: 50%;\r\n}\r\n\r\n.sr-only[_ngcontent-%COMP%]{\r\n    color: #f0ab18;\r\n}\r\n\r\n.carousel-control-next[_ngcontent-%COMP%]{\r\n    color: #f0ab18;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC90ZXN0aW1vbmlhbHMvdGVzdGltb25pYWxzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLGtCQUFrQjtJQUNsQixjQUFjO0FBQ2xCOztBQUVBOztJQUVJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBSUM7SUFDRyxrQkFBa0I7QUFDdEI7O0FBRUM7SUFDRyx1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsZ0NBQWdDO0lBQ2hDLGtCQUFrQjtJQUNsQixnQkFBZ0I7QUFDcEI7O0FBRUM7SUFDRyxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsV0FBVztBQUNmOztBQUVDO0lBQ0csZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixvQkFBb0I7SUFDcEIsV0FBVztBQUNmOztBQUVDO0lBQ0csZUFBZTtJQUNmLFdBQVc7SUFDWCxTQUFTO0FBQ2I7O0FBRUM7O0lBRUcsY0FBYztJQUNkLGVBQWU7QUFDbkI7O0FBRUM7SUFDRyxxQkFBcUI7SUFDckIsVUFBVTtJQUNWLGtCQUFrQjtBQUN0Qjs7QUFFQztJQUNHLHFCQUFxQjtJQUNyQixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLFNBQVM7QUFDYjs7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQiwyQkFBMkI7QUFDL0I7O0FBRUM7O0lBRUcsZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7QUFFQztJQUNHLHFCQUFxQjtJQUNyQixhQUFhO0lBQ2IsV0FBVztJQUNYLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0k7UUFDSSxlQUFlO0lBQ25CO0lBQ0E7UUFDSSxhQUFhO1FBQ2IsWUFBWTtJQUNoQjtJQUNBO1FBQ0ksZ0JBQWdCO1FBQ2hCLFVBQVU7SUFDZDtBQUNKOztBQUNBO0lBQ0ksV0FBVztJQUNYLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsZUFBZTtBQUNuQjs7QUFFQTs7SUFFSSxXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsYUFBYTtJQUNiLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsa0JBQWtCO0FBQ3RCOztBQUNBO0lBQ0ksY0FBYztBQUNsQjs7QUFDQTtJQUNJLGNBQWM7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9wYWdlQ29tcG9uZW50L3Rlc3RpbW9uaWFscy90ZXN0aW1vbmlhbHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInNlY3Rpb24ge1xyXG4gICAgcGFkZGluZzogNjBweCAwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLnNlY3Rpb24tYmcge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZmJmZTtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDMwcHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyIHtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGNvbG9yOiAjMjIyMjIyO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YmVmb3JlLFxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YWZ0ZXIge1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIGhlaWdodDogMnB4O1xyXG4gICAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDI6OmJlZm9yZSB7XHJcbiAgICBtYXJnaW46IDAgMTVweCAxMHB4IDA7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjphZnRlciB7XHJcbiAgICBtYXJnaW46IDAgMCAxMHB4IDE1cHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIHAge1xyXG4gICAgbWFyZ2luOiAxNXB4IDAgMCAwO1xyXG59XHJcblxyXG5cclxuXHJcbiAudGVzdGltb25pYWwtd3JhcCB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDUwcHg7XHJcbn1cclxuXHJcbiAudGVzdGltb25pYWwtaXRlbSB7XHJcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuICAgIHBhZGRpbmc6IDMwcHggMzBweCAzMHB4IDYwcHg7XHJcbiAgICBtYXJnaW46IDMwcHggMTVweDtcclxuICAgIG1pbi1oZWlnaHQ6IDEwMHB4O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDJweCAxMnB4ICNmMGFiMTg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG59XHJcblxyXG4gLnRlc3RpbW9uaWFsLWl0ZW0gLnRlc3RpbW9uaWFsLWltZyB7XHJcbiAgICB3aWR0aDogOTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXI6IDZweCBzb2xpZCAjZmZmO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogLTQ1cHg7XHJcbn1cclxuXHJcbiAudGVzdGltb25pYWwtaXRlbSBoMyB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIG1hcmdpbjogMTBweCAwIDVweCAwO1xyXG4gICAgY29sb3I6ICMxMTE7XHJcbn1cclxuXHJcbiAudGVzdGltb25pYWwtaXRlbSBoNCB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBjb2xvcjogIzk5OTtcclxuICAgIG1hcmdpbjogMDtcclxufVxyXG5cclxuIC50ZXN0aW1vbmlhbC1pdGVtIC5xdW90ZS1pY29uLWxlZnQsXHJcbi50ZXN0aW1vbmlhbC1pdGVtIC5xdW90ZS1pY29uLXJpZ2h0IHtcclxuICAgIGNvbG9yOiAjZTFmMGZhO1xyXG4gICAgZm9udC1zaXplOiAyNnB4O1xyXG59XHJcblxyXG4gLnRlc3RpbW9uaWFsLWl0ZW0gLnF1b3RlLWljb24tbGVmdCB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBsZWZ0OiAtNXB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4gLnRlc3RpbW9uaWFsLWl0ZW0gLnF1b3RlLWljb24tcmlnaHQge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcmlnaHQ6IC01cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB0b3A6IDEwcHg7XHJcbn1cclxuLnRlc3RpbW9uaWFsLWl0ZW0gcCB7XHJcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICBtYXJnaW46IDE1cHggYXV0byAxNXB4IGF1dG87XHJcbn1cclxuXHJcbiAub3dsLW5hdixcclxuIC5vd2wtZG90cyB7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbiAub3dsLWRvdCB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBtYXJnaW46IDAgNXB4O1xyXG4gICAgd2lkdGg6IDEycHg7XHJcbiAgICBoZWlnaHQ6IDEycHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi50ZXN0aW1vbmlhbHMgLm93bC1kb3QuYWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMGFiMTggIWltcG9ydGFudDtcclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAudGVzdGltb25pYWxzIC50ZXN0aW1vbmlhbC13cmFwIHtcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XHJcbiAgICB9XHJcbiAgICAudGVzdGltb25pYWxzIC50ZXN0aW1vbmlhbC1pdGVtIHtcclxuICAgICAgICBwYWRkaW5nOiAzMHB4O1xyXG4gICAgICAgIG1hcmdpbjogMTVweDtcclxuICAgIH1cclxuICAgIC50ZXN0aW1vbmlhbHMgLnRlc3RpbW9uaWFsLWl0ZW0gLnRlc3RpbW9uaWFsLWltZyB7XHJcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcclxuICAgICAgICBsZWZ0OiBhdXRvO1xyXG4gICAgfVxyXG59XHJcbi5zZXJ2aWNlRGl2IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDVyZW07XHJcbiAgICBmb250LXNpemU6IDMycHg7XHJcbn1cclxuXHJcbi5zZXJ2aWNlRGl2IGgxOjpiZWZvcmUsXHJcbi5zZXJ2aWNlRGl2IGgxOjphZnRlciB7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgaGVpZ2h0OiAycHg7XHJcbiAgICBtYXJnaW46IDFyZW07XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjBhYjE4O1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcblxyXG4uc2VydmljZURpdiBoMSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIHBhZGRpbmc6IDAuMyU7XHJcbiAgICBmb250LXNpemU6IDMycHg7XHJcbn1cclxuXHJcbi5jYXJvdXNlbC1jb250cm9sLW5leHQtaWNvbiwgLmNhcm91c2VsLWNvbnRyb2wtcHJldi1pY29ue1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIyMjIyMjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxufVxyXG4uc3Itb25seXtcclxuICAgIGNvbG9yOiAjZjBhYjE4O1xyXG59XHJcbi5jYXJvdXNlbC1jb250cm9sLW5leHR7XHJcbiAgICBjb2xvcjogI2YwYWIxODtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TestimonialsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-testimonials',
                templateUrl: './testimonials.component.html',
                styleUrls: ['./testimonials.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "NyhI":
/*!****************************************************************************!*\
  !*** ./src/app/pageComponent/video/video-player/video-player.component.ts ***!
  \****************************************************************************/
/*! exports provided: VideoPlayerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoPlayerComponent", function() { return VideoPlayerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/util/page.enum */ "7yHB");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _videos_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../videos.service */ "/n1y");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _component_header_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../component/header/header.component */ "Pk+G");
/* harmony import */ var _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../component/footer/footer.component */ "xb3B");









class VideoPlayerComponent {
    constructor(mediaObserver, videoService, router, sanitizer) {
        this.mediaObserver = mediaObserver;
        this.videoService = videoService;
        this.router = router;
        this.sanitizer = sanitizer;
        this.videoId = '';
        this.videoTitle = '';
    }
    ngOnInit() {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
        this.mediaSub = this.mediaObserver.media$.subscribe((result) => {
            this.deviceXs = result.mqAlias == 'xs' ? true : false;
            this.deviceMd = result.mqAlias == 'md' ? true : false;
            this.deviceSm = result.mqAlias == 'sm' ? true : false;
        });
        this.videoId = localStorage.getItem('videoid');
        this.videoTitle = localStorage.getItem('videotitle');
        // player
        this.link = `https://www.youtube-nocookie.com/embed/${this.videoId}?modestbranding=1&rel=0&showinfo=0`;
        if (this.link) {
            this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
        }
        this.thumbNail = `http://img.youtube.com/vi/${this.videoId}/0.jpg`;
    }
    back() {
        this.router.navigate([src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_1__["Page"].VIDEOS]);
        localStorage.removeItem('videoid');
        localStorage.removeItem('videotitle');
    }
}
VideoPlayerComponent.ɵfac = function VideoPlayerComponent_Factory(t) { return new (t || VideoPlayerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["MediaObserver"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_videos_service__WEBPACK_IMPORTED_MODULE_3__["VideosService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"])); };
VideoPlayerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: VideoPlayerComponent, selectors: [["app-video-player"]], decls: 11, vars: 2, consts: [[1, "header"], [2, "font-weight", "bold", 3, "click"], ["aria-hidden", "true", 1, "fa", "fa-angle-left", 2, "padding-right", "5px"], [1, "serviceDiv", "text-center"], [1, "container-fluid"], ["frameborder", "0", "allowfullscreen", "allowfullscreen", "mozallowfullscreen", "mozallowfullscreen", "msallowfullscreen", "msallowfullscreen", "oallowfullscreen", "oallowfullscreen", "webkitallowfullscreen", "webkitallowfullscreen", 1, "responsive-iframe", 3, "src"]], template: function VideoPlayerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VideoPlayerComponent_Template_a_click_2_listener() { return ctx.back(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Back ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "iframe", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "app-footer");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.videoTitle);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.safeURL, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeResourceUrl"]);
    } }, directives: [_component_header_header_component__WEBPACK_IMPORTED_MODULE_6__["HeaderComponent"], _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_7__["FooterComponent"]], styles: [".container-fluid[_ngcontent-%COMP%] {\n  height: 100%;\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n  \n}\n\n.responsive-iframe[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  height: 80%;\n  border: none;\n}\n\n.header[_ngcontent-%COMP%] {\n  display: inline;\n}\n\na[_ngcontent-%COMP%] {\n  font-weight: 300;\n  font-size: 2rem;\n  margin: 8px;\n  color: #f0ab18;\n}\n\na[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n\n.serviceDiv[_ngcontent-%COMP%] {\n  width: 100%;\n  align-items: center;\n  \n  font-size: 32px;\n}\n\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before, .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::after {\n  content: \"\";\n  width: 50px;\n  height: 2px;\n  margin: 1rem;\n  background: #f0ab18;\n  display: inline-block;\n}\n\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  text-align: center;\n  font-weight: bold;\n  padding: 2.3%;\n  font-size: 32px;\n}\n\n@media (max-width: 768px) {\n  .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 20px !important;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC92aWRlby92aWRlby1wbGF5ZXIvdmlkZW8tcGxheWVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0EsWUFBQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0Msc0JBQUE7QUFDSDs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUNBO0VBQ0UsZUFBQTtBQUVGOztBQUNBO0VBQ0UsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7QUFFRjs7QUFBQTtFQUNFLGVBQUE7QUFHRjs7QUFDQTtFQUNFLFdBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtBQUVGOztBQUNBOztFQUVFLFdBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0FBRUY7O0FBQ0E7RUFDRSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7QUFFRjs7QUFBQTtFQUNFO0lBQ0UsMEJBQUE7RUFHRjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvcGFnZUNvbXBvbmVudC92aWRlby92aWRlby1wbGF5ZXIvdmlkZW8tcGxheWVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lci1mbHVpZCB7XHJcbmhlaWdodDoxMDAlO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB3aWR0aDogMTAwJTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAvKiAxNjo5IEFzcGVjdCBSYXRpbyAqL1xyXG59XHJcblxyXG4ucmVzcG9uc2l2ZS1pZnJhbWUge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICBib3R0b206IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiA4MCU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG59XHJcbi5oZWFkZXJ7XHJcbiAgZGlzcGxheTogaW5saW5lO1xyXG59XHJcblxyXG5he1xyXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgZm9udC1zaXplOiAycmVtO1xyXG4gIG1hcmdpbjo4cHg7XHJcbiAgY29sb3I6ICNmMGFiMTg7XHJcbn1cclxuYTpob3ZlcntcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcblxyXG4uc2VydmljZURpdiB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAvKiBtYXJnaW4tdG9wOiA1cmVtOyAqL1xyXG4gIGZvbnQtc2l6ZTogMzJweDtcclxufVxyXG5cclxuLnNlcnZpY2VEaXYgaDE6OmJlZm9yZSxcclxuLnNlcnZpY2VEaXYgaDE6OmFmdGVyIHtcclxuICBjb250ZW50OiAnJztcclxuICB3aWR0aDogNTBweDtcclxuICBoZWlnaHQ6IDJweDtcclxuICBtYXJnaW46IDFyZW07XHJcbiAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5zZXJ2aWNlRGl2IGgxIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgcGFkZGluZzogMi4zJTtcclxuICBmb250LXNpemU6IDMycHg7XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLnNlcnZpY2VEaXYgaDEge1xyXG4gICAgZm9udC1zaXplOiAyMHB4ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](VideoPlayerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-video-player',
                templateUrl: './video-player.component.html',
                styleUrls: ['./video-player.component.scss']
            }]
    }], function () { return [{ type: _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["MediaObserver"] }, { type: _videos_service__WEBPACK_IMPORTED_MODULE_3__["VideosService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"] }]; }, null); })();


/***/ }),

/***/ "OGwY":
/*!********************************************************!*\
  !*** ./src/app/pageComponent/about/about.component.ts ***!
  \********************************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/util/page.enum */ "7yHB");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var _component_header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/header/header.component */ "Pk+G");
/* harmony import */ var _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/footer/footer.component */ "xb3B");






class AboutComponent {
    constructor(utilService) {
        this.utilService = utilService;
    }
    ngOnInit() {
    }
    downLoadBrochure() {
        this.utilService.ScrollToTop();
        window.open(src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_1__["ExternalURLs"].BROCHURE, '_blank');
    }
}
AboutComponent.ɵfac = function AboutComponent_Factory(t) { return new (t || AboutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_2__["UtilService"])); };
AboutComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AboutComponent, selectors: [["app-about"]], decls: 29, vars: 0, consts: [["id", "about", 1, "about", 2, "background-color", "#e4eded"], [1, "container"], ["data-aos", "fade-up", 1, "section-title"], [1, "row", "content"], ["data-aos", "fade-up", "data-aos-delay", "150", 1, "col-md-6"], [1, "text-justify"], ["data-aos", "fade-up", "data-aos-delay", "300", 1, "col-md-6", "pt-4", "pt-lg-0"], [1, "btn-learn-more", 2, "cursor", "pointer", 3, "click"]], template: function AboutComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "About Us");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " We are NinthSem. We help engineering aspirants of core industries graduate with industry-ready skillsets. And oh we help build perspectives too! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " The general Engineering scene in India is lackluster at best. Baring the Computer Science (and related branches), all other streams do not have the required hands-on knowledge or an overview about their respective sectors i.e Mechanical, Electrical, Civil, Chemical, Metallurgy, Instrumentation and Biotech etc. Every year around one lakh engineering students graduate from their colleges only to be placed in software companies(IT and ITES) or some call centers (BPOs). Why? Because these fresh minds do not have any idea about THE HOW, THE WHAT, and THE WHERE of the industries. They risk their initial years of employment only to realize, there is no going back.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " This is where we come in. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "We assist these freshers by giving them a laid-out idea or a map to understand 'the how' and 'the where' of the sectors they have graduated from. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "And assisted how? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "By providing him with the necessary skillsets and making him industry-ready. Our Subject Matter Experts come with years of experience and technical understanding. They will guide you, teach you and make sure you are all ready to take that leap into the industry. All you need is to ask. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "We are a passionate team of engineers who wish to change the engineering scene in the country. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "We are here to help you prepare for what is beyond the 8th semester. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AboutComponent_Template_a_click_26_listener() { return ctx.downLoadBrochure(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Download Brochure");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "app-footer");
    } }, directives: [_component_header_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"], _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"]], styles: ["section[_ngcontent-%COMP%] {\r\n    padding: 60px 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.section-bg[_ngcontent-%COMP%] {\r\n    background-color: #f7fbfe;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    padding-bottom: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    font-size: 32px;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n    position: relative;\r\n    color: #222222;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before, .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\r\n    margin: 0 15px 10px 0;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    margin: 0 0 10px 15px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin: 15px 0 0 0;\r\n}\r\n\r\n.about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n    font-weight: 600;\r\n    font-size: 26px;\r\n}\r\n\r\n.content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n    font-size: 16px;\r\n    margin-top: 4px;\r\n}\r\n\r\n.about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\r\n    margin-bottom: 0;\r\n}\r\n\r\n.about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .btn-learn-more[_ngcontent-%COMP%] {\r\n    font-family: \"Raleway\", sans-serif;\r\n    font-weight: 600;\r\n    font-size: 14px;\r\n    letter-spacing: 1px;\r\n    display: inline-block;\r\n    padding: 12px 32px;\r\n    border-radius: 50px;\r\n    transition: 0.3s;\r\n    line-height: 1;\r\n    color: #f0ab18;\r\n    -webkit-animation-delay: 0.8s;\r\n    animation-delay: 0.8s;\r\n    margin-top: 6px;\r\n    border: 2px solid #f0ab18;\r\n}\r\n\r\n.about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .btn-learn-more[_ngcontent-%COMP%]:hover {\r\n    background: #f0ab18;\r\n    color: #fff;\r\n    text-decoration: none;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9hYm91dC9hYm91dC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLHlCQUF5QjtJQUN6QixrQkFBa0I7SUFDbEIsY0FBYztBQUNsQjs7QUFFQTs7SUFFSSxXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUlBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGVBQWU7QUFDbkI7O0FBQ0E7SUFDSSxlQUFlO0lBQ2YsZUFBZTtBQUNuQjs7QUFLQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGtDQUFrQztJQUNsQyxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGNBQWM7SUFDZCw2QkFBNkI7SUFDN0IscUJBQXFCO0lBQ3JCLGVBQWU7SUFDZix5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsV0FBVztJQUNYLHFCQUFxQjtBQUN6QiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvYWJvdXQvYWJvdXQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInNlY3Rpb24ge1xyXG4gICAgcGFkZGluZzogNjBweCAwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLnNlY3Rpb24tYmcge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZmJmZTtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDMwcHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyIHtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGNvbG9yOiAjMjIyMjIyO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YmVmb3JlLFxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YWZ0ZXIge1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIGhlaWdodDogMnB4O1xyXG4gICAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDI6OmJlZm9yZSB7XHJcbiAgICBtYXJnaW46IDAgMTVweCAxMHB4IDA7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjphZnRlciB7XHJcbiAgICBtYXJnaW46IDAgMCAxMHB4IDE1cHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIHAge1xyXG4gICAgbWFyZ2luOiAxNXB4IDAgMCAwO1xyXG59XHJcblxyXG5cclxuXHJcbi5hYm91dCAuY29udGVudCBoMyB7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zaXplOiAyNnB4O1xyXG59XHJcbi5jb250ZW50IHB7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBtYXJnaW4tdG9wOiA0cHg7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi5hYm91dCAuY29udGVudCBwOmxhc3QtY2hpbGQge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcclxufVxyXG5cclxuLmFib3V0IC5jb250ZW50IC5idG4tbGVhcm4tbW9yZSB7XHJcbiAgICBmb250LWZhbWlseTogXCJSYWxld2F5XCIsIHNhbnMtc2VyaWY7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDFweDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHBhZGRpbmc6IDEycHggMzJweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjNzO1xyXG4gICAgbGluZS1oZWlnaHQ6IDE7XHJcbiAgICBjb2xvcjogI2YwYWIxODtcclxuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjhzO1xyXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAwLjhzO1xyXG4gICAgbWFyZ2luLXRvcDogNnB4O1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgI2YwYWIxODtcclxufVxyXG5cclxuLmFib3V0IC5jb250ZW50IC5idG4tbGVhcm4tbW9yZTpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjBhYjE4O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AboutComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-about',
                templateUrl: './about.component.html',
                styleUrls: ['./about.component.css']
            }]
    }], function () { return [{ type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_2__["UtilService"] }]; }, null); })();


/***/ }),

/***/ "Ogej":
/*!**********************************************!*\
  !*** ./src/app/util/SessionStoreKey.enum.ts ***!
  \**********************************************/
/*! exports provided: SessionStoreKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionStoreKey", function() { return SessionStoreKey; });
var SessionStoreKey;
(function (SessionStoreKey) {
    SessionStoreKey["BRANCH"] = "BRANCH";
    SessionStoreKey["BRANCH_CLASS"] = "BRANCH_CLASS";
})(SessionStoreKey || (SessionStoreKey = {}));


/***/ }),

/***/ "Pk+G":
/*!******************************************************!*\
  !*** ./src/app/component/header/header.component.ts ***!
  \******************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _headermenu_headermenu_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../headermenu/headermenu.component */ "cdMo");
/* harmony import */ var _authentication_login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../authentication/login/login.component */ "U5be");
/* harmony import */ var _authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../authentication/signup/signup.component */ "4eZQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_component_authentication_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/component/authentication/enum */ "v6DW");
/* harmony import */ var src_app_util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/util/sessionStorageHelper */ "kBAY");
/* harmony import */ var src_app_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/util/SessionStoreKey.enum */ "Ogej");
/* harmony import */ var src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/util/page.enum */ "7yHB");
/* harmony import */ var _pageComponent_report_section_report_enum__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../pageComponent/report-section/report.enum */ "cyVU");
/* harmony import */ var _authentication_payment_payment_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../authentication/payment/payment.component */ "fQ4N");
/* harmony import */ var _authentication_profile_profile_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../authentication/profile/profile.component */ "y1GL");
/* harmony import */ var _authentication_logout_msg_logout_msg_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../authentication/logout-msg/logout-msg.component */ "8dd4");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var _authentication_auth_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../authentication/auth.service */ "ddlN");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _enumkeyvalue_pipe__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../enumkeyvalue.pipe */ "a+px");






















function HeaderComponent_span_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "span", 12);
} }
function HeaderComponent_span_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "span", 12);
} }
function HeaderComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_div_10_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r6.openDialog(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "menu");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function HeaderComponent_div_12_li_6_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "a", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_div_12_li_6_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r10.videos(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Videos");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function HeaderComponent_div_12_li_11_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_div_12_li_11_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14); const b_r12 = ctx.$implicit; const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r13.openCourseDetails(b_r12.key); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const b_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](b_r12.key);
} }
function HeaderComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_div_12_Template_a_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r15.goToPage(ctx_r15.Page.HOME); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Home");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, HeaderComponent_div_12_li_6_Template, 3, 0, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "li", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Courses");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, HeaderComponent_div_12_li_11_Template, 3, 1, "li", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](12, "enumKeyValue");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "a", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_div_12_Template_a_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r16); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r17.goToBlog(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Blog");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "a", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_div_12_Template_a_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r16); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r18.goToPage(ctx_r18.Page.ABOUT); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "About");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "a", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_div_12_Template_a_click_20_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r16); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r19.goToExpertPage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "Industry Experts");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_div_12_Template_a_click_23_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r16); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r20.goToJoinUs(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "Join Us");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r3.userIsAuthenticated);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](12, 2, ctx_r3.branches));
} }
function HeaderComponent_span_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "span", 12);
} }
function HeaderComponent_div_14_li_4_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Account");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function HeaderComponent_div_14_li_4_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", ctx_r27.firstname, " ", ctx_r27.lastName, "");
} }
function HeaderComponent_div_14_li_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, HeaderComponent_div_14_li_4_span_1_Template, 2, 0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, HeaderComponent_div_14_li_4_span_2_Template, 2, 2, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r21.userIsAuthenticated);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r21.userIsAuthenticated);
} }
function HeaderComponent_div_14_li_6_Template(rf, ctx) { if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_div_14_li_6_Template_li_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r29); const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r28.Login(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function HeaderComponent_div_14_li_7_Template(rf, ctx) { if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_div_14_li_7_Template_li_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r31); const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r30.Signup(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " Signup");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function HeaderComponent_div_14_li_8_Template(rf, ctx) { if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_div_14_li_8_Template_li_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r33); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r32.profile(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function HeaderComponent_div_14_li_9_Template(rf, ctx) { if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_div_14_li_9_Template_li_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r35); const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r34.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function HeaderComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ul", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "li", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "a", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, HeaderComponent_div_14_li_4_Template, 3, 2, "li", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, HeaderComponent_div_14_li_6_Template, 3, 0, "li", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, HeaderComponent_div_14_li_7_Template, 3, 0, "li", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, HeaderComponent_div_14_li_8_Template, 3, 0, "li", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, HeaderComponent_div_14_li_9_Template, 3, 0, "li", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r5.deviceLg || ctx_r5.deviceMd);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r5.userIsAuthenticated);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r5.userIsAuthenticated);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r5.userIsAuthenticated);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r5.userIsAuthenticated);
} }
class HeaderComponent {
    constructor(matDialog, mediaObserver, utilService, authService, router) {
        this.matDialog = matDialog;
        this.mediaObserver = mediaObserver;
        this.utilService = utilService;
        this.authService = authService;
        this.router = router;
        this.branches = src_app_component_authentication_enum__WEBPACK_IMPORTED_MODULE_4__["Branch"];
        this.userIsAuthenticated = false;
    }
    ngOnInit() {
        this.firstname = this.authService.Firstname();
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusListener = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => this.userIsAuthenticated = isAuthenticated);
        this.Page = src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_7__["Page"];
        // tslint:disable-next-line: deprecation
        this.mediaSub = this.mediaObserver.media$.subscribe((result) => {
            this.deviceLg = result.mqAlias === 'lg' ? true : false;
            this.deviceMd = result.mqAlias === 'md' ? true : false;
        });
        if (this.authService.Firstname()) {
            this.firstname = this.authService.Firstname().toUpperCase();
        }
        if (this.authService.Lastname()) {
            this.lastName = this.authService.Lastname().toUpperCase();
        }
    }
    Payment() {
        this.matDialog.open(_authentication_payment_payment_component__WEBPACK_IMPORTED_MODULE_9__["PaymentComponent"]);
    }
    Signup() {
        this.matDialog.open(_authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_2__["SignupComponent"]);
    }
    Login() {
        this.matDialog.open(_authentication_login_login_component__WEBPACK_IMPORTED_MODULE_1__["LoginComponent"]);
    }
    logout() {
        this.authService.logout();
        this.matDialog.open(_authentication_logout_msg_logout_msg_component__WEBPACK_IMPORTED_MODULE_11__["LogoutMsgComponent"]);
    }
    openDialog() {
        this.matDialog.open(_headermenu_headermenu_component__WEBPACK_IMPORTED_MODULE_0__["HeadermenuComponent"]);
        _pageComponent_report_section_report_enum__WEBPACK_IMPORTED_MODULE_8__["report"].isMenuOpened = true;
    }
    openCourseDetails(courseKey) {
        this.utilService.ScrollToTop();
        src_app_util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_5__["sessionStore"].set(src_app_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_6__["SessionStoreKey"].BRANCH, courseKey);
        let branchClass = courseKey.replace(/\s+/g, '-').toLowerCase();
        branchClass = branchClass === 'electronics-&-communication-engineering' ? 'ece' : branchClass;
        src_app_util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_5__["sessionStore"].set(src_app_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_6__["SessionStoreKey"].BRANCH_CLASS, branchClass);
        this.router.navigate([src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_7__["Page"].COURSE_DETAILS]);
    }
    goToPage(pageType) {
        this.utilService.ScrollToTop();
        this.router.navigate([pageType]);
        _pageComponent_report_section_report_enum__WEBPACK_IMPORTED_MODULE_8__["report"].videoEnable = true;
    }
    goToBlog() {
        this.utilService.ScrollToTop();
        window.open(src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_7__["ExternalURLs"].BLOG, '_blank');
    }
    goToJoinUs() {
        this.utilService.ScrollToTop();
        window.open(src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_7__["ExternalURLs"].JOINUS, '_blank');
    }
    goToExpertPage() {
        this.utilService.ScrollToTop();
        window.open(src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_7__["ExternalURLs"].EXPERT, '_blank');
    }
    profile() {
        this.matDialog.open(_authentication_profile_profile_component__WEBPACK_IMPORTED_MODULE_10__["ProfileComponent"]);
    }
    videos() {
        this.router.navigate([src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_7__["Page"].VIDEOS]);
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_flex_layout__WEBPACK_IMPORTED_MODULE_13__["MediaObserver"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_authentication_auth_service__WEBPACK_IMPORTED_MODULE_15__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_16__["Router"])); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 15, vars: 6, consts: [[1, "header-wrapper"], [1, "container-fluid"], [1, "row"], [1, "col-xl-3", "col-lg-12", "col-sm-12", "col-md-12", "col-xs-12"], [1, "logo", "mr-auto"], [3, "click"], ["src", "./assets/images/ninthsemlogo.png", "alt", "", 1, "img-responsive"], ["class", "spacer", 4, "ngIf"], ["class", "menu", 4, "ngIf"], ["lass", "col-lg-8 col-md-10 col-sm-8 col-xs-12 "], ["c", "", "class", "navigation-wrapper", 4, "ngIf"], ["id", "navigation", 4, "ngIf"], [1, "spacer"], [1, "menu"], ["mat-button", "", 3, "click"], ["c", "", 1, "navigation-wrapper"], ["id", "navigation"], ["title", "Home", 3, "click"], [4, "ngIf"], [1, "has-sub"], ["title", "Course"], [4, "ngFor", "ngForOf"], ["target", "_blank", "title", "NinthSem Blog", 3, "click"], ["title", "About", 3, "click"], ["title", "Industry Expert", 3, "click"], ["title", "Join Us", 3, "click"], ["title", "Videos", 3, "click"], [1, "accountList"], [1, "account"], ["class", "fa fa-user-circle", "aria-hidden", "true", 4, "ngIf"], [3, "click", 4, "ngIf"], ["color", "accent", 3, "click", 4, "ngIf"], ["aria-hidden", "true", 1, "fa", "fa-user-circle"], ["color", "accent", 3, "click"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeaderComponent_Template_a_click_6_listener() { return ctx.goToPage(ctx.Page.HOME); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, HeaderComponent_span_8_Template, 1, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, HeaderComponent_span_9_Template, 1, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, HeaderComponent_div_10_Template, 4, 0, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, HeaderComponent_div_12_Template, 25, 4, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, HeaderComponent_span_13_Template, 1, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, HeaderComponent_div_14_Template, 10, 5, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.deviceLg);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.deviceMd);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.deviceLg);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.deviceLg);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.deviceLg);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.deviceLg);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_17__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_18__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_17__["NgForOf"]], pipes: [_enumkeyvalue_pipe__WEBPACK_IMPORTED_MODULE_20__["EnumKeyValuePipe"]], styles: [".logo[_ngcontent-%COMP%] {\r\n    display: flex;\r\n}\r\n\r\n.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n    margin-left: 0;\r\n    height: 5rem;\r\n}\r\n\r\n.fa[_ngcontent-%COMP%] {\r\n    font-size: 2rem;\r\n    font-weight: 500;\r\n}\r\n\r\n.account[_ngcontent-%COMP%] {\r\n    font-size: 14px;\r\n    background: #f0ab18;\r\n    color: #fff;\r\n    border-radius: 50px;\r\n    margin: 0 0 0 30px;\r\n    padding: 10px 25px;\r\n    cursor: pointer;\r\n    \r\n}\r\n\r\n.menu[_ngcontent-%COMP%] {\r\n    display: inline-flex;\r\n}\r\n\r\n.spacer[_ngcontent-%COMP%] {\r\n    flex: 1 1 auto;\r\n}\r\n\r\n#navigation[_ngcontent-%COMP%] {\r\n    margin-right: 4rem;\r\n}\r\n\r\na[_ngcontent-%COMP%] {\r\n    cursor: pointer;\r\n}\r\n\r\n#navigation[_ngcontent-%COMP%]   .accountList[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n width: 140px; \r\n\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUg7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksY0FBYztJQUNkLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsZUFBZTs7QUFFbkI7O0FBRUE7SUFDSSxvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUNBO0lBQ0ksZUFBZTtBQUNuQjs7QUFDQTtDQUNDLFlBQVk7O0FBRWIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLmhlYWRlci13cmFwcGVyIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgIzliYWJhYiwgI2YwYWIxOCk7XHJcbiAgICB6LWluZGV4OiA5OTk7XHJcbn0gKi9cclxuXHJcbi5sb2dvIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbn1cclxuXHJcbi5sb2dvIGltZyB7XHJcbiAgICBtYXJnaW4tbGVmdDogMDtcclxuICAgIGhlaWdodDogNXJlbTtcclxufVxyXG5cclxuLmZhIHtcclxuICAgIGZvbnQtc2l6ZTogMnJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbn1cclxuXHJcbi5hY2NvdW50IHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGJhY2tncm91bmQ6ICNmMGFiMTg7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBtYXJnaW46IDAgMCAwIDMwcHg7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDI1cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBcclxufVxyXG5cclxuLm1lbnUge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbn1cclxuXHJcbi5zcGFjZXIge1xyXG4gICAgZmxleDogMSAxIGF1dG87XHJcbn1cclxuXHJcbiNuYXZpZ2F0aW9uIHtcclxuICAgIG1hcmdpbi1yaWdodDogNHJlbTtcclxufVxyXG5hIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4jbmF2aWdhdGlvbiAuYWNjb3VudExpc3QgdWwgbGkgYXtcclxuIHdpZHRoOiAxNDBweDsgXHJcblxyXG59XHJcblxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](HeaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"],
        args: [{
                selector: 'app-header',
                templateUrl: './header.component.html',
                styleUrls: ['./header.component.css']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__["MatDialog"] }, { type: _angular_flex_layout__WEBPACK_IMPORTED_MODULE_13__["MediaObserver"] }, { type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"] }, { type: _authentication_auth_service__WEBPACK_IMPORTED_MODULE_15__["AuthService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__["Router"] }]; }, null); })();


/***/ }),

/***/ "PyXz":
/*!*********************************************************!*\
  !*** ./src/app/pageComponent/video/videos-list.enum.ts ***!
  \*********************************************************/
/*! exports provided: CE, METAL, ECE, ME, CHE, INITIAL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CE", function() { return CE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "METAL", function() { return METAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ECE", function() { return ECE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ME", function() { return ME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHE", function() { return CHE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIAL", function() { return INITIAL; });
var CE;
(function (CE) {
    CE["title"] = "CIVIL ENGINEERING";
    CE["content"] = "some text here ... about the branch...";
})(CE || (CE = {}));
var METAL;
(function (METAL) {
    METAL["title"] = "METALLURGY ENGINEERING";
    METAL["content"] = "some text here ... about the branch...";
})(METAL || (METAL = {}));
var ECE;
(function (ECE) {
    ECE["title"] = "ELECTRICAL ENGINEERING";
    // title= 'ELECTRICAL ENGINEERING',
    ECE["content"] = "some text here ... about the branch...";
})(ECE || (ECE = {}));
var ME;
(function (ME) {
    ME["title"] = "MECHANICAL ENGINEERING";
    ME["content"] = "some text here ... about the branch...";
})(ME || (ME = {}));
var CHE;
(function (CHE) {
    CHE["title"] = "CHEMICAL ENGINEERING";
    CHE["content"] = "some text here ... about the branch...";
})(CHE || (CHE = {}));
var INITIAL;
(function (INITIAL) {
    INITIAL["title"] = "ENGINEERING";
})(INITIAL || (INITIAL = {}));


/***/ }),

/***/ "SuRV":
/*!************************************************************************!*\
  !*** ./src/app/pageComponent/course-detail/course-detail.component.ts ***!
  \************************************************************************/
/*! exports provided: CourseDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseDetailComponent", function() { return CourseDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/util/sessionStorageHelper */ "kBAY");
/* harmony import */ var src_app_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/util/SessionStoreKey.enum */ "Ogej");
/* harmony import */ var src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/util/course-detail.enum */ "sEIG");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _component_header_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../component/header/header.component */ "Pk+G");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/flex-layout/extended */ "znSr");
/* harmony import */ var _pricing_pricing_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../pricing/pricing.component */ "14eC");
/* harmony import */ var _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../component/footer/footer.component */ "xb3B");












function CourseDetailComponent_p_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const point_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" \u00A0", point_r1, "");
} }
class CourseDetailComponent {
    constructor(utilService, matDialog) {
        this.utilService = utilService;
        this.matDialog = matDialog;
    }
    ngOnInit() {
    }
    getBranchName() {
        this.branch = src_app_util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_1__["sessionStore"].get(src_app_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_2__["SessionStoreKey"].BRANCH);
        return this.branch;
    }
    getBranchClassName() {
        this.backgroundImageClass = src_app_util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_1__["sessionStore"].get(src_app_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_2__["SessionStoreKey"].BRANCH_CLASS);
        return this.backgroundImageClass;
    }
    getBranchDetail() {
        if (this.branch === 'Civil Engineering') {
            return src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__["showDetail_Civil"];
        }
        else if (this.branch === 'Electrical Engineering') {
            this.points = src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__["showDetail_Electrical"].extraPoints;
            return src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__["showDetail_Electrical"];
        }
        else if (this.branch === 'Chemical Engineering') {
            this.points = src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__["showDetail_Chemical"].extraPoints;
            return src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__["showDetail_Chemical"];
        }
        else if (this.branch === 'Mechanical Engineering') {
            this.points = src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__["showDetail_Mechanical"].extraPoints;
            return src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__["showDetail_Mechanical"];
        }
        else if (this.branch === 'Metallurgy Engineering') {
            this.points = src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__["showDetail_Metallurgy"].extraPoints;
            return src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__["showDetail_Metallurgy"];
        }
        else if (this.branch === 'Biotech Engineering') {
            return src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__["showDetail_Biotech"];
        }
        else if (this.branch === 'Electronics & Communication Engineering') {
            return src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__["showDetail_ECE"];
        }
        else if (this.branch === 'Aeronautical Engineering') {
            return src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_3__["showDetail_Aeronautical"];
        }
    }
}
CourseDetailComponent.ɵfac = function CourseDetailComponent_Factory(t) { return new (t || CourseDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_4__["UtilService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"])); };
CourseDetailComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CourseDetailComponent, selectors: [["app-course-detail"]], decls: 45, vars: 5, consts: [["id", "course-detail", 1, "course-detail"], [1, "row", "jumbotron", 3, "ngClass"], [1, "row", "column", "top"], [1, "col-md-12", 2, "text-align", "center"], [1, "display-4"], [1, "lead"], [1, "container"], [1, "row"], [1, "serviceDiv", "text-center"], [1, "col-sm-12", "col-lg-12", "col-md-12", "list-group"], [1, "text-justify"], [4, "ngFor", "ngForOf"], [1, "col-sm-6", "col-lg-12", "col-md-12", "col-sm-12", "sideDiv"], [1, "div1", "col-lg-1", "col-md-12", "col-sm-12"], ["src", "../../../assets/images/medal.png"], [1, "div2", "col-lg-5", "col-md-12", "col-sm-12"], [1, "div3", "col-lg-1", "col-md-12", "col-sm-12"], ["src", "../../../assets/images/domain.png"], [1, "div4", "col-lg-5", "col-md-12", "col-sm-12"], [1, "row", 2, "display", "block"], ["aria-hidden", "true", 1, "fa", "fa-check-circle", "fa-lg"]], template: function CourseDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h1", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "ABOUT THIS COURSE ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Skills You Will Gain Throughout This Course Are:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, CourseDetailComponent_p_23_Template, 3, 1, "p", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "img", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Earn a Certificate upon completion");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Which Will Value Added To Your CV/Resume");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "img", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "100% online courses");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Start instantly and learn at your own schedule.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "app-pricing");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "app-footer");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.getBranchClassName());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getBranchName());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getBranchDetail().detail);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.getBranchDetail().about, ".After completing this specialization you will be industry-ready.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.points);
    } }, directives: [_component_header_header_component__WEBPACK_IMPORTED_MODULE_6__["HeaderComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgClass"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_8__["DefaultClassDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _pricing_pricing_component__WEBPACK_IMPORTED_MODULE_9__["PricingComponent"], _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_10__["FooterComponent"]], styles: [".course-detail[_ngcontent-%COMP%]{\r\n    margin:20px;\r\n}\r\n.mechanical-engineering[_ngcontent-%COMP%]{\r\n   background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/carousel/mech.jpg');\r\n   background-size: cover;\r\n    color:white;\r\n   background-position: center;\r\n }\r\n.electrical-engineering[_ngcontent-%COMP%]{\r\n    background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/carousel/elec.jpg');\r\n    background-size: cover;\r\n     color:white;\r\n    background-position: center;\r\n  }\r\n.civil-engineering[_ngcontent-%COMP%]{\r\n    background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/carousel/civ.jpg');\r\n    background-size: cover;\r\n     color:white;\r\n    background-position: center;\r\n  }\r\n.metallurgy-engineering[_ngcontent-%COMP%]{\r\n    background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/carousel/met.jpg');\r\n    background-size: cover;\r\n     color:white;\r\n    background-position: center;\r\n  }\r\n.chemical-engineering[_ngcontent-%COMP%]{\r\n    background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/carousel/chem.jpg');\r\n    background-size: cover;\r\n     color:white;\r\n    background-position: center;\r\n  }\r\n.biotech-engineering[_ngcontent-%COMP%]{\r\n    background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/card/biotech.jpeg');\r\n    background-size: cover;\r\n     color:white;\r\n    background-position: center;\r\n  }\r\n.ece[_ngcontent-%COMP%]{\r\n    background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/card/ece.jpg');\r\n    background-size: cover;\r\n     color:white;\r\n    background-position: center;\r\n  }\r\n.aeronautical-engineering[_ngcontent-%COMP%]{\r\n    background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/card/aero.jpg');\r\n    background-size: cover;\r\n     color:white;\r\n    background-position: center;\r\n  }\r\n\r\n\r\n.top[_ngcontent-%COMP%]{\r\n    width: 100%;\r\n}\r\n.imgDiv[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    height: 280px;\r\n    width: 450px;\r\n   padding-left: 150px;\r\n}\r\n.sideDiv[_ngcontent-%COMP%]{\r\n     padding-left: 150px;\r\n     padding-top: 0px;\r\n }\r\n.list-group[_ngcontent-%COMP%]{\r\n    margin-left: 20px;\r\n}\r\n.list-group[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n\r\n    font-size: 18px;\r\n}\r\n.div2[_ngcontent-%COMP%], .div4[_ngcontent-%COMP%]{\r\n    padding-left: 20px;\r\n    padding-top: 10px;\r\n}\r\n.div2[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .div4[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{\r\n   margin-bottom: 5px;\r\n   font-size: 20px;\r\n}\r\n.div1[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n\r\n   height: 70px;\r\n   width: 70px;\r\n}\r\n.div3[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    height: 50px;\r\n    width: 50px;\r\n}\r\n.column[_ngcontent-%COMP%]{\r\n\r\n    padding: 10px;\r\n\r\n}\r\n.column[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]{\r\n    display: block;\r\n    width: 100%;\r\n\r\n}\r\n.column[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{\r\n     font-size: 33px;\r\n\r\n\r\n}\r\n.pack[_ngcontent-%COMP%]{\r\n    width: 80%;\r\n    margin-left: 10%;\r\n}\r\n.row[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{\r\n    margin-left: 30px;\r\n\r\n}\r\n.card[_ngcontent-%COMP%]{\r\n    width:100%;\r\n    max-height: 250px;\r\n    border-radius: 25px;\r\n    margin-bottom: 5px;\r\n    background: #F9F9F9;\r\n    display: grid;\r\n    margin: auto;\r\n    grid-template-columns: auto auto auto;\r\n\r\n}\r\n.card[_ngcontent-%COMP%]:hover {\r\n    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);\r\n\r\n}\r\n.secondDiv[_ngcontent-%COMP%]{\r\n    border: 4px solid #f0ab18;\r\n}\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]{\r\n    margin: auto;\r\n}\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{\r\n    font-size: 25px;\r\n    margin-bottom: 30px;\r\n    margin-top: 20px;\r\n}\r\n.btn[_ngcontent-%COMP%]{\r\n    display: block;\r\n    width: 140px;\r\n    height: 40px;\r\n    \r\n    border-radius: 16px;\r\n    font-size: 16px;\r\n    border: 4px solid #f0ab18;\r\n    color: #f0ab18;\r\n    margin: auto;\r\n\r\n}\r\n.btn[_ngcontent-%COMP%]:hover{\r\n    background: #f0ab18;\r\n    border: none;\r\n    transition: 0.7s;\r\n    color: white;\r\n}\r\n.secondDiv[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n    color: white;\r\n    background: #f0ab18;\r\n\r\n}\r\n.secondDiv[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{\r\n    color: white;\r\n    background: #2383C4;\r\n\r\n}\r\n.row[_ngcontent-%COMP%]:after {\r\n    content: \"\";\r\n    display: table;\r\n    clear: both;\r\n  }\r\n.skills[_ngcontent-%COMP%]{\r\n    width:40%;\r\n    margin-left: 20px;\r\n}\r\n.fa-check-circle[_ngcontent-%COMP%]{\r\n    color: #f0ab18;\r\n}\r\n.more-details[_ngcontent-%COMP%]{\r\n    margin-left: 20px;\r\n    margin-top: 20px;\r\n    width: 60%;\r\n}\r\n.serviceDiv[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    align-items: center;\r\n    \r\n    font-size: 32px;\r\n}\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before, .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    margin: 1rem;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    padding: 25px;\r\n    font-size: 32px;\r\n}\r\n.card-body[_ngcontent-%COMP%]   sup[_ngcontent-%COMP%]   .fa-rupee[_ngcontent-%COMP%]{\r\n    text-decoration: line-through;\r\n    font-size: 20px;\r\n    color: #f0ab18;\r\n    padding-right: 5px;\r\n}\r\n.card-body[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{\r\n    font-size: 35px;\r\n    color: #f0ab18;\r\n\r\n}\r\n.card-body[_ngcontent-%COMP%]   sub[_ngcontent-%COMP%] {\r\n\r\n    font-size: 16px;\r\n    color: #C6C6C6;\r\n    padding-left: 5px;\r\n}\r\n@media (min-width: 992px) and (max-width: 1200px){\r\n    .sideDiv[_ngcontent-%COMP%]{\r\n        padding-left: 90px;\r\n    }\r\n   \r\n}\r\n@media (min-width: 576px) and (max-width: 767.98px){\r\n     .card[_ngcontent-%COMP%]{\r\n        display: grid;\r\n        grid-template-columns: auto ;\r\n    }\r\n    .jumbotron[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .imgDiv[_ngcontent-%COMP%]{\r\n        display: none;\r\n    }\r\n}\r\n@media (min-width: 768px) and (max-width: 991.98px){\r\n    .card[_ngcontent-%COMP%]{\r\n        display: grid;\r\n        grid-template-columns: auto auto;\r\n    }\r\n\r\n}\r\n@media(max-width:768px)\r\n{\r\n    .sideDiv[_ngcontent-%COMP%]{\r\n        padding-left: 150px;\r\n    }\r\n    .pack[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{\r\n       margin-top: 20px;\r\n       margin-bottom: 10px;\r\n\r\n    }\r\n\r\n\r\n}\r\n@media(max-width:575.9px)\r\n{\r\n    .jumbotron[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .imgDiv[_ngcontent-%COMP%]{\r\n        display: none;\r\n    }\r\n    .lead[_ngcontent-%COMP%]{\r\n        font-size: 19px;\r\n    }\r\n    .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{\r\n        font-size: 20px;\r\n        margin-left: -4%;\r\n    }\r\n    .sideDiv[_ngcontent-%COMP%]{\r\n        padding-left: 20px;\r\n        padding-top: 50px;\r\n\r\n    }\r\n     .sideDiv[_ngcontent-%COMP%]   .div1[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .sideDiv[_ngcontent-%COMP%]   .div1[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .sideDiv[_ngcontent-%COMP%]   .div3[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .sideDiv[_ngcontent-%COMP%]   .div3[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n        height: 50px;\r\n        width: 50px;\r\n    }\r\n    .sideDiv[_ngcontent-%COMP%]   .div2[_ngcontent-%COMP%], .sideDiv[_ngcontent-%COMP%]   .div4[_ngcontent-%COMP%]{\r\n    padding-left: 8px;\r\n    padding-top: 0px;\r\n}\r\n    .sideDiv[_ngcontent-%COMP%]   .div2[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .sideDiv[_ngcontent-%COMP%]   .div2[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .sideDiv[_ngcontent-%COMP%]   .div4[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .sideDiv[_ngcontent-%COMP%]   .div4[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{\r\n        font-size: 14px;\r\n    }\r\n    .pack[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{\r\n       margin-top: 20px;\r\n       margin-bottom: 10px;\r\n    }\r\n}\r\n@media(max-width:430px){\r\n    .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{\r\n        padding: 0px;\r\n        margin-left: -5%;\r\n    }\r\n}\r\n.container[_ngcontent-%COMP%]{\r\n    width:100%;\r\n    height:auto;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9jb3Vyc2UtZGV0YWlsL2NvdXJzZS1kZXRhaWwuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7QUFDZjtBQUNBO0dBQ0csaUhBQWlIO0dBQ2pILHNCQUFzQjtJQUNyQixXQUFXO0dBQ1osMkJBQTJCO0NBQzdCO0FBRUE7SUFDRyxpSEFBaUg7SUFDakgsc0JBQXNCO0tBQ3JCLFdBQVc7SUFDWiwyQkFBMkI7RUFDN0I7QUFFQTtJQUNFLGdIQUFnSDtJQUNoSCxzQkFBc0I7S0FDckIsV0FBVztJQUNaLDJCQUEyQjtFQUM3QjtBQUVBO0lBQ0UsZ0hBQWdIO0lBQ2hILHNCQUFzQjtLQUNyQixXQUFXO0lBQ1osMkJBQTJCO0VBQzdCO0FBRUE7SUFDRSxpSEFBaUg7SUFDakgsc0JBQXNCO0tBQ3JCLFdBQVc7SUFDWiwyQkFBMkI7RUFDN0I7QUFDQTtJQUNFLGlIQUFpSDtJQUNqSCxzQkFBc0I7S0FDckIsV0FBVztJQUNaLDJCQUEyQjtFQUM3QjtBQUVBO0lBQ0UsNEdBQTRHO0lBQzVHLHNCQUFzQjtLQUNyQixXQUFXO0lBQ1osMkJBQTJCO0VBQzdCO0FBRUE7SUFDRSw2R0FBNkc7SUFDN0csc0JBQXNCO0tBQ3JCLFdBQVc7SUFDWiwyQkFBMkI7RUFDN0I7QUFDRjs7O0dBR0c7QUFFSDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUdIO0lBQ0ksV0FBVztBQUNmO0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtHQUNiLG1CQUFtQjtBQUN0QjtBQUNBO0tBQ0ssbUJBQW1CO0tBQ25CLGdCQUFnQjtDQUNwQjtBQUNEO0lBQ0ksaUJBQWlCO0FBQ3JCO0FBQ0E7O0lBRUksZUFBZTtBQUNuQjtBQUNDO0lBQ0csa0JBQWtCO0lBQ2xCLGlCQUFpQjtBQUNyQjtBQUNDO0dBQ0Usa0JBQWtCO0dBQ2xCLGVBQWU7QUFDbEI7QUFFQzs7R0FFRSxZQUFZO0dBQ1osV0FBVztBQUNkO0FBQ0E7SUFDSSxZQUFZO0lBQ1osV0FBVztBQUNmO0FBQ0E7O0lBRUksYUFBYTs7QUFFakI7QUFFQTtJQUNJLGNBQWM7SUFDZCxXQUFXOztBQUVmO0FBQ0E7S0FDSyxlQUFlOzs7QUFHcEI7QUFDQTtJQUNJLFVBQVU7SUFDVixnQkFBZ0I7QUFDcEI7QUFDQTtJQUNJLGlCQUFpQjs7QUFFckI7QUFDQTtJQUNJLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLFlBQVk7SUFDWixxQ0FBcUM7O0FBRXpDO0FBQ0E7SUFDSSx3Q0FBd0M7O0FBRTVDO0FBQ0E7SUFDSSx5QkFBeUI7QUFDN0I7QUFDQTtJQUNJLFlBQVk7QUFDaEI7QUFDQTtJQUNJLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsZ0JBQWdCO0FBQ3BCO0FBRUE7SUFDSSxjQUFjO0lBQ2QsWUFBWTtJQUNaLFlBQVk7SUFDWixxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZix5QkFBeUI7SUFDekIsY0FBYztJQUNkLFlBQVk7O0FBRWhCO0FBQ0E7SUFDSSxtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxZQUFZO0lBQ1osbUJBQW1COztBQUV2QjtBQUNBO0lBQ0ksWUFBWTtJQUNaLG1CQUFtQjs7QUFFdkI7QUFDQTtJQUNJLFdBQVc7SUFDWCxjQUFjO0lBQ2QsV0FBVztFQUNiO0FBRUE7SUFDRSxTQUFTO0lBQ1QsaUJBQWlCO0FBQ3JCO0FBQ0E7SUFDSSxjQUFjO0FBQ2xCO0FBQ0E7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLFVBQVU7QUFDZDtBQUNBO0lBQ0ksV0FBVztJQUNYLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsZUFBZTtBQUNuQjtBQUVBOztJQUVJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIscUJBQXFCO0FBQ3pCO0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixlQUFlO0FBQ25CO0FBQ0E7SUFDSSw2QkFBNkI7SUFDN0IsZUFBZTtJQUNmLGNBQWM7SUFDZCxrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLGVBQWU7SUFDZixjQUFjOztBQUVsQjtBQUNBOztJQUVJLGVBQWU7SUFDZixjQUFjO0lBQ2QsaUJBQWlCO0FBQ3JCO0FBQ0E7SUFDSTtRQUNJLGtCQUFrQjtJQUN0QjtHQUNEOztNQUVHO0FBQ047QUFDQTtLQUNLO1FBQ0csYUFBYTtRQUNiLDRCQUE0QjtJQUNoQztJQUNBO1FBQ0ksYUFBYTtJQUNqQjtBQUNKO0FBQ0E7SUFDSTtRQUNJLGFBQWE7UUFDYixnQ0FBZ0M7SUFDcEM7O0FBRUo7QUFFQTs7SUFFSTtRQUNJLG1CQUFtQjtJQUN2QjtJQUNBO09BQ0csZ0JBQWdCO09BQ2hCLG1CQUFtQjs7SUFFdEI7OztBQUdKO0FBQ0E7O0lBRUk7UUFDSSxhQUFhO0lBQ2pCO0lBQ0E7UUFDSSxlQUFlO0lBQ25CO0lBQ0E7UUFDSSxlQUFlO1FBQ2YsZ0JBQWdCO0lBQ3BCO0lBQ0E7UUFDSSxrQkFBa0I7UUFDbEIsaUJBQWlCOztJQUVyQjtLQUNDOztRQUVHLFlBQVk7UUFDWixXQUFXO0lBQ2Y7SUFDQTtJQUNBLGlCQUFpQjtJQUNqQixnQkFBZ0I7QUFDcEI7SUFDSTs7UUFFSSxlQUFlO0lBQ25CO0lBQ0E7T0FDRyxnQkFBZ0I7T0FDaEIsbUJBQW1CO0lBQ3RCO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksWUFBWTtRQUNaLGdCQUFnQjtJQUNwQjtBQUNKO0FBQ0E7SUFDSSxVQUFVO0lBQ1YsV0FBVztBQUNmIiwiZmlsZSI6InNyYy9hcHAvcGFnZUNvbXBvbmVudC9jb3Vyc2UtZGV0YWlsL2NvdXJzZS1kZXRhaWwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb3Vyc2UtZGV0YWlse1xyXG4gICAgbWFyZ2luOjIwcHg7XHJcbn1cclxuLm1lY2hhbmljYWwtZW5naW5lZXJpbmd7XHJcbiAgIGJhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHJnYmEoMCwgMCwgMCwgMC41KSwgcmdiYSgwLCAwLCAwLCAwLjUpKSwgdXJsKCcvYXNzZXRzL2ltYWdlcy9jYXJvdXNlbC9tZWNoLmpwZycpO1xyXG4gICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgY29sb3I6d2hpdGU7XHJcbiAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuIH1cclxuXHJcbiAuZWxlY3RyaWNhbC1lbmdpbmVlcmluZ3tcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHJnYmEoMCwgMCwgMCwgMC41KSwgcmdiYSgwLCAwLCAwLCAwLjUpKSwgdXJsKCcvYXNzZXRzL2ltYWdlcy9jYXJvdXNlbC9lbGVjLmpwZycpO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgICBjb2xvcjp3aGl0ZTtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICB9XHJcblxyXG4gIC5jaXZpbC1lbmdpbmVlcmluZ3tcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHJnYmEoMCwgMCwgMCwgMC41KSwgcmdiYSgwLCAwLCAwLCAwLjUpKSwgdXJsKCcvYXNzZXRzL2ltYWdlcy9jYXJvdXNlbC9jaXYuanBnJyk7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgIGNvbG9yOndoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLm1ldGFsbHVyZ3ktZW5naW5lZXJpbmd7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMC41KSksIHVybCgnL2Fzc2V0cy9pbWFnZXMvY2Fyb3VzZWwvbWV0LmpwZycpO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgICBjb2xvcjp3aGl0ZTtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICB9XHJcblxyXG4gIC5jaGVtaWNhbC1lbmdpbmVlcmluZ3tcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHJnYmEoMCwgMCwgMCwgMC41KSwgcmdiYSgwLCAwLCAwLCAwLjUpKSwgdXJsKCcvYXNzZXRzL2ltYWdlcy9jYXJvdXNlbC9jaGVtLmpwZycpO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgICBjb2xvcjp3aGl0ZTtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICB9XHJcbiAgLmJpb3RlY2gtZW5naW5lZXJpbmd7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMC41KSksIHVybCgnL2Fzc2V0cy9pbWFnZXMvY2FyZC9iaW90ZWNoLmpwZWcnKTtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgICAgY29sb3I6d2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAuZWNle1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQocmdiYSgwLCAwLCAwLCAwLjUpLCByZ2JhKDAsIDAsIDAsIDAuNSkpLCB1cmwoJy9hc3NldHMvaW1hZ2VzL2NhcmQvZWNlLmpwZycpO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgICBjb2xvcjp3aGl0ZTtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICB9XHJcblxyXG4gIC5hZXJvbmF1dGljYWwtZW5naW5lZXJpbmd7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMC41KSksIHVybCgnL2Fzc2V0cy9pbWFnZXMvY2FyZC9hZXJvLmpwZycpO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgICBjb2xvcjp3aGl0ZTtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICB9XHJcbi8qIC5kaXNwbGF5LTR7XHJcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxufSAqL1xyXG5cclxuLyogLmRpc3BsYXktNCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDMwJTtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gICAgY29sb3I6d2hpdGU7XHJcbn1cclxuLmxlYWQge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA2MCU7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICAgIGNvbG9yOndoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcclxuICAgIGZvbnQtc2l6ZTogMjJweDtcclxufSAqL1xyXG5cclxuXHJcbi50b3B7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG4gICBcclxuLmltZ0RpdiBpbWd7XHJcbiAgICBoZWlnaHQ6IDI4MHB4O1xyXG4gICAgd2lkdGg6IDQ1MHB4O1xyXG4gICBwYWRkaW5nLWxlZnQ6IDE1MHB4O1xyXG59XHJcbi5zaWRlRGl2e1xyXG4gICAgIHBhZGRpbmctbGVmdDogMTUwcHg7XHJcbiAgICAgcGFkZGluZy10b3A6IDBweDtcclxuIH1cclxuLmxpc3QtZ3JvdXB7XHJcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcclxufVxyXG4ubGlzdC1ncm91cCBwe1xyXG5cclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxufVxyXG4gLmRpdjIsIC5kaXY0e1xyXG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG4gICAgcGFkZGluZy10b3A6IDEwcHg7XHJcbn1cclxuIC5kaXYyIGgxLCAuZGl2NCBoMXtcclxuICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gICBmb250LXNpemU6IDIwcHg7XHJcbn1cclxuXHJcbiAuZGl2MSBpbWcge1xyXG5cclxuICAgaGVpZ2h0OiA3MHB4O1xyXG4gICB3aWR0aDogNzBweDtcclxufVxyXG4uZGl2MyBpbWd7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICB3aWR0aDogNTBweDtcclxufVxyXG4uY29sdW1ue1xyXG5cclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcblxyXG59XHJcblxyXG4uY29sdW1uIC5oZWFkaW5ne1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuXHJcbn1cclxuLmNvbHVtbiAuaGVhZGluZyBoMXtcclxuICAgICBmb250LXNpemU6IDMzcHg7XHJcblxyXG5cclxufVxyXG4ucGFja3tcclxuICAgIHdpZHRoOiA4MCU7XHJcbiAgICBtYXJnaW4tbGVmdDogMTAlO1xyXG59XHJcbi5yb3cgLmNhcmR7XHJcbiAgICBtYXJnaW4tbGVmdDogMzBweDtcclxuXHJcbn1cclxuLmNhcmR7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gICAgbWF4LWhlaWdodDogMjUwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gICAgYmFja2dyb3VuZDogI0Y5RjlGOTtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gYXV0byBhdXRvO1xyXG5cclxufVxyXG4uY2FyZDpob3ZlciB7XHJcbiAgICBib3gtc2hhZG93OiAwIDhweCAxNnB4IDAgcmdiYSgwLDAsMCwwLjIpO1xyXG5cclxufVxyXG4uc2Vjb25kRGl2e1xyXG4gICAgYm9yZGVyOiA0cHggc29saWQgI2YwYWIxODtcclxufVxyXG4uY2FyZCAuY2FyZC1ib2R5e1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG59XHJcbi5jYXJkIC5jYXJkLWJvZHkgaDN7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG5cclxuLmJ0bntcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDE0MHB4O1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgLypsaW5lLWhlaWdodDogMzBweDsqL1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGJvcmRlcjogNHB4IHNvbGlkICNmMGFiMTg7XHJcbiAgICBjb2xvcjogI2YwYWIxODtcclxuICAgIG1hcmdpbjogYXV0bztcclxuXHJcbn1cclxuLmJ0bjpob3ZlcntcclxuICAgIGJhY2tncm91bmQ6ICNmMGFiMTg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjdzO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcbi5zZWNvbmREaXYgYXtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6ICNmMGFiMTg7XHJcblxyXG59XHJcbi5zZWNvbmREaXYgYTpob3ZlcntcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6ICMyMzgzQzQ7XHJcblxyXG59XHJcbi5yb3c6YWZ0ZXIge1xyXG4gICAgY29udGVudDogXCJcIjtcclxuICAgIGRpc3BsYXk6IHRhYmxlO1xyXG4gICAgY2xlYXI6IGJvdGg7XHJcbiAgfVxyXG5cclxuICAuc2tpbGxze1xyXG4gICAgd2lkdGg6NDAlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbn1cclxuLmZhLWNoZWNrLWNpcmNsZXtcclxuICAgIGNvbG9yOiAjZjBhYjE4O1xyXG59XHJcbi5tb3JlLWRldGFpbHN7XHJcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICB3aWR0aDogNjAlO1xyXG59XHJcbi5zZXJ2aWNlRGl2IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIC8qIG1hcmdpbi10b3A6IDVyZW07ICovXHJcbiAgICBmb250LXNpemU6IDMycHg7XHJcbn1cclxuXHJcbi5zZXJ2aWNlRGl2IGgxOjpiZWZvcmUsXHJcbi5zZXJ2aWNlRGl2IGgxOjphZnRlciB7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgaGVpZ2h0OiAycHg7XHJcbiAgICBtYXJnaW46IDFyZW07XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjBhYjE4O1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcblxyXG4uc2VydmljZURpdiBoMSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIHBhZGRpbmc6IDI1cHg7XHJcbiAgICBmb250LXNpemU6IDMycHg7XHJcbn1cclxuLmNhcmQtYm9keSBzdXAgLmZhLXJ1cGVle1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBjb2xvcjogI2YwYWIxODtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDVweDtcclxufVxyXG4uY2FyZC1ib2R5IGg0e1xyXG4gICAgZm9udC1zaXplOiAzNXB4O1xyXG4gICAgY29sb3I6ICNmMGFiMTg7XHJcblxyXG59XHJcbi5jYXJkLWJvZHkgc3ViIHtcclxuXHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBjb2xvcjogI0M2QzZDNjtcclxuICAgIHBhZGRpbmctbGVmdDogNXB4O1xyXG59XHJcbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkgYW5kIChtYXgtd2lkdGg6IDEyMDBweCl7XHJcbiAgICAuc2lkZURpdntcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDkwcHg7XHJcbiAgICB9XHJcbiAgIC8qIC5zaWRlRGl2IC5kaXY0IGgxLC5zaWRlRGl2IC5kaXY0IGgze1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIH0qL1xyXG59XHJcbkBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkgYW5kIChtYXgtd2lkdGg6IDc2Ny45OHB4KXtcclxuICAgICAuY2FyZHtcclxuICAgICAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byA7XHJcbiAgICB9XHJcbiAgICAuanVtYm90cm9uIC50b3AgLmltZ0RpdntcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG59XHJcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDk5MS45OHB4KXtcclxuICAgIC5jYXJke1xyXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIGF1dG87XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5AbWVkaWEobWF4LXdpZHRoOjc2OHB4KVxyXG57XHJcbiAgICAuc2lkZURpdntcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDE1MHB4O1xyXG4gICAgfVxyXG4gICAgLnBhY2sgLmNhcmR7XHJcbiAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5AbWVkaWEobWF4LXdpZHRoOjU3NS45cHgpXHJcbntcclxuICAgIC5qdW1ib3Ryb24gLnRvcCAuaW1nRGl2e1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgICAubGVhZHtcclxuICAgICAgICBmb250LXNpemU6IDE5cHg7XHJcbiAgICB9XHJcbiAgICAuc2VydmljZURpdiBoMXtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC00JTtcclxuICAgIH1cclxuICAgIC5zaWRlRGl2e1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMjBweDtcclxuICAgICAgICBwYWRkaW5nLXRvcDogNTBweDtcclxuXHJcbiAgICB9XHJcbiAgICAgLnNpZGVEaXYgLmRpdjEgaW1nLC5zaWRlRGl2IC5kaXYxIGltZyxcclxuICAgIC5zaWRlRGl2IC5kaXYzIGltZywuc2lkZURpdiAuZGl2MyBpbWd7XHJcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgfVxyXG4gICAgLnNpZGVEaXYgLmRpdjIsLnNpZGVEaXYgLmRpdjR7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDhweDtcclxuICAgIHBhZGRpbmctdG9wOiAwcHg7XHJcbn1cclxuICAgIC5zaWRlRGl2IC5kaXYyIGgxLC5zaWRlRGl2IC5kaXYyIGgzLFxyXG4gICAgLnNpZGVEaXYgLmRpdjQgaDEsLnNpZGVEaXYgLmRpdjQgaDN7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgfVxyXG4gICAgLnBhY2sgLmNhcmR7XHJcbiAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgIH1cclxufVxyXG5AbWVkaWEobWF4LXdpZHRoOjQzMHB4KXtcclxuICAgIC5zZXJ2aWNlRGl2IGgxe1xyXG4gICAgICAgIHBhZGRpbmc6IDBweDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogLTUlO1xyXG4gICAgfVxyXG59XHJcbi5jb250YWluZXJ7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gICAgaGVpZ2h0OmF1dG87XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CourseDetailComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-course-detail',
                templateUrl: './course-detail.component.html',
                styleUrls: ['./course-detail.component.css']
            }]
    }], function () { return [{ type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_4__["UtilService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"] }]; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aos */ "9a8T");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/authentication/auth.service */ "ddlN");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");






class AppComponent {
    constructor(authService, utilService) {
        this.authService = authService;
        this.utilService = utilService;
        this.title = 'ninthsem-master';
    }
    ngOnInit() {
        this.authService.autoAuthUser();
        aos__WEBPACK_IMPORTED_MODULE_1__["init"]();
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_3__["UtilService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return [{ type: _component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }, { type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_3__["UtilService"] }]; }, null); })();


/***/ }),

/***/ "U5be":
/*!*******************************************************************!*\
  !*** ./src/app/component/authentication/login/login.component.ts ***!
  \*******************************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../enum */ "v6DW");
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../signup/signup.component */ "4eZQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _req_mail_req_mail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../req-mail/req-mail.component */ "jnji");
/* harmony import */ var _success_msg_success_msg_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../success-msg/success-msg.component */ "8O3K");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! aos */ "9a8T");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../auth.service */ "ddlN");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ "bTqV");


















function LoginComponent_mat_spinner_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-spinner");
} }
function LoginComponent_div_2_div_2_mat_error_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Please enter valid email !!! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function LoginComponent_div_2_div_2_mat_error_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Please enter valid password!!! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function LoginComponent_div_2_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "clear");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "h2", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "form", 14, 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("submit", function LoginComponent_div_2_div_2_Template_form_submit_12_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](13); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r9.onLogin(_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "mat-form-field", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "input", 17, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "mail");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](20, LoginComponent_div_2_div_2_mat_error_20_Template, 2, 0, "mat-error", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "mat-form-field", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](22, "input", 20, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LoginComponent_div_2_div_2_Template_button_click_24_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r11.hide = !ctx_r11.hide; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](27, LoginComponent_div_2_div_2_mat_error_27_Template, 2, 0, "mat-error", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "Submit");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "h3", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, "Reset Password ? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LoginComponent_div_2_div_2_Template_button_click_34_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r12.forgot(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, "Click Here");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "h3", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37, "Don't have an account? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](38, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LoginComponent_div_2_div_2_Template_button_click_38_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r13.signup(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](39, "Register Here");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](16);
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](23);
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _r5.invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("type", ctx_r3.hide ? "password" : "text");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("aria-label", "Hide password")("aria-pressed", ctx_r3.hide);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.hide ? "visibility_off" : "visibility");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _r7.invalid);
} }
function LoginComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, LoginComponent_div_2_div_2_Template, 40, 6, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r1.userIsAuthenticated);
} }
function LoginComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h1", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Successful !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "You are Logged in !");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class LoginComponent {
    constructor(authService, matDialog, router, utilService) {
        this.authService = authService;
        this.matDialog = matDialog;
        this.router = router;
        this.utilService = utilService;
        this.hide = true;
        this.isLoading = false;
        this.isVerified = false;
        this.mail = '';
        this.userIsAuthenticated = false;
    }
    ngOnInit() {
        aos__WEBPACK_IMPORTED_MODULE_5__["init"]();
        this.sm = _enum__WEBPACK_IMPORTED_MODULE_0__["SocialMediaTerms"];
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe();
        this.mail = this.authService.getEmail();
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusListener = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => {
            this.isLoading = false,
                this.userIsAuthenticated = isAuthenticated;
        });
        if (this.userIsAuthenticated == true) {
            this.matDialog.open(_success_msg_success_msg_component__WEBPACK_IMPORTED_MODULE_4__["SuccessMsgComponent"]);
        }
    }
    //
    onLogin(form) {
        if (form.invalid) {
            return;
        }
        else {
            this.authService.login(form.value.email, form.value.password);
            this.isVerified = true;
            this.isLoading = true;
            this.router.navigate(['/home']);
        }
    }
    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
    signup() {
        this.matDialog.open(_signup_signup_component__WEBPACK_IMPORTED_MODULE_1__["SignupComponent"]);
    }
    openSocialMedia(type) {
        return this.utilService.openSocialMedia(type);
    }
    forgot() {
        this.matDialog.open(_req_mail_req_mail_component__WEBPACK_IMPORTED_MODULE_3__["ReqMailComponent"]);
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_9__["UtilService"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 4, vars: 3, consts: [[4, "ngIf"], ["data-aos", "zoom-in-up", 4, "ngIf"], ["data-aos", "zoom-in-up"], [1, "dialogContent"], ["class", "container", "mat-dialog-content", "", "style", "background-image: url(/assets/images/login-image.png);", 4, "ngIf"], ["mat-dialog-content", "", 1, "container", 2, "background-image", "url(/assets/images/login-image.png)"], [1, "d-flex", "flex-row-reverse"], ["mat-dialog-close", "", "align", "end", 2, "color", "white", "background", "#384545", "margin-top", "20px"], [1, "row"], [1, "col-6", "col-xs-12", "login_main", 2, "text-align", "center"], [1, "logo"], ["src", "assets/images/profile.png", 1, "rounded", "mx-auto", "d-block", 2, "width", "25%"], [1, "heading3", "text-center"], [1, "main_form"], [3, "submit"], ["loginForm", "ngForm"], ["appearance", "outline"], ["name", "email", "ngModel", "", "type", "email", "matInput", "", "placeholder", "Please enter your email", "required", "", "email", ""], ["emailInput", "ngModel"], ["mat-icon-button", "", "matSuffix", ""], ["type", "password", "ngModel", "", "name", "password", "matInput", "", "placeholder", "Please enter your password", "required", "", 3, "type"], ["passInput", "ngModel"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], ["type", "submit", "id", "btn1", 2, "padding", "1rem 3rem !important"], [2, "margin", "20px 0 16px !important"], ["mat-dialog-close", "", "type", "submit", "id", "btn1", 1, "btn", 3, "click"], ["src", "/assets/images/ninthsemlogo.png", "alt", "img", 1, "align-center"], ["mat-dialog-title", ""], ["mat-dialog-content", ""], ["mat-dialog-actions", ""], ["mat-button", "", "mat-dialog-close", ""]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, LoginComponent_mat_spinner_1_Template, 1, 0, "mat-spinner", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, LoginComponent_div_2_Template, 3, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, LoginComponent_div_3_Template, 9, 0, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.userIsAuthenticated);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__["MatSpinner"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialogContent"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIcon"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialogClose"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatFormField"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["DefaultValueAccessor"], _angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["EmailValidator"], _angular_material_button__WEBPACK_IMPORTED_MODULE_16__["MatButton"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatSuffix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatError"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialogActions"]], styles: [".mat-dialog-content {\n  overflow-x: hidden;\n  margin: auto;\n}\n.dialogContent[_ngcontent-%COMP%] {\n  background-image: linear-gradient(to right, #e4eded, #747a7a) !important;\n}\n.heading2[_ngcontent-%COMP%] {\n  color: #4C4C4C;\n  font-family: \"Poppins\", poppins;\n  font-weight: 400;\n  line-height: 1.3em;\n}\n.container[_ngcontent-%COMP%] {\n  width: auto;\n  height: auto;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.heading3[_ngcontent-%COMP%] {\n  color: #4C4C4C;\n  font-family: \"Poppins\", poppins;\n  font-size: 20px;\n  font-weight: 800;\n  line-height: 1.3em;\n  padding-left: 0px;\n}\n.heading[_ngcontent-%COMP%] {\n  color: #4C4C4C;\n  font-family: \"Poppins\", poppins;\n  font-size: 40px;\n  font-weight: 515;\n  text-transform: capitalize;\n  line-height: 1em;\n}\n.h4[_ngcontent-%COMP%] {\n  margin-bottom: 0px;\n}\n#butn[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n}\n\n.cancelBtn[_ngcontent-%COMP%] {\n  color: white;\n  float: right;\n  margin-top: 20px;\n}\n@media (min-width: 1200px) {\n  .container[_ngcontent-%COMP%] {\n    width: 600px;\n  }\n}\n.logo[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n#btn1[_ngcontent-%COMP%] {\n  background-color: black;\n  color: white;\n  border-radius: 5px;\n}\n.social-links[_ngcontent-%COMP%] {\n  padding-bottom: 20px;\n  padding-top: 10px;\n}\na[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.follow-us[_ngcontent-%COMP%] {\n  color: #4C4C4C;\n  font-family: \"Poppins\", poppins;\n  font-size: 18px;\n  font-weight: 600;\n  text-transform: capitalize;\n  line-height: 1em;\n}\n.notification[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-height: 5rem;\n  max-width: 16rem;\n}\nimg[_ngcontent-%COMP%] {\n  max-height: 5rem;\n  max-width: 16rem;\n}\n@media (max-width: 600px) {\n  .row[_ngcontent-%COMP%] {\n    position: relative;\n  }\n\n  .login_main[_ngcontent-%COMP%] {\n    margin-left: -14rem;\n  }\n\n  mat-form-field[_ngcontent-%COMP%] {\n    max-width: 220px;\n  }\n\n  h3[_ngcontent-%COMP%] {\n    min-width: 200px;\n  }\n\n  .logo[_ngcontent-%COMP%] {\n    margin-left: 80px;\n    width: 60px;\n    height: auto;\n  }\n\n  .img[_ngcontent-%COMP%] {\n    width: 60px;\n    height: auto;\n  }\n\n  h2[_ngcontent-%COMP%] {\n    margin-left: 80px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0FBQUo7QUFVRTtFQUNFLHdFQUFBO0FBUko7QUFXQTtFQUNFLGNBQUE7RUFDRSwrQkFBQTtFQUVBLGdCQUFBO0VBQ0Esa0JBQUE7QUFUSjtBQVlBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFURjtBQVlBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFURjtBQVlBO0VBQ0UsY0FBQTtFQUNFLCtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQVRKO0FBV0E7RUFDRSxjQUFBO0VBQ0UsK0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQkFBQTtFQUNBLGdCQUFBO0FBUko7QUFXQTtFQUNFLGtCQUFBO0FBUkY7QUFXQTtFQUNFLG1CQUFBO0FBUkY7QUFVQTs7R0FBQTtBQUdDO0VBQ0EsWUFBQTtFQUNHLFlBQUE7RUFDQSxnQkFBQTtBQVBKO0FBU0E7RUFDRTtJQUNFLFlBQUE7RUFORjtBQUNGO0FBU0E7RUFDRSxtQkFBQTtBQVBGO0FBV0U7RUFDRSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQVJKO0FBV0E7RUFDRSxvQkFBQTtFQUNBLGlCQUFBO0FBUkY7QUFjQTtFQUNFLGVBQUE7QUFYRjtBQWFBO0VBQ0UsY0FBQTtFQUNFLCtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsMEJBQUE7RUFDQSxnQkFBQTtBQVZKO0FBYUE7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0FBVkY7QUFhQTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7QUFWRjtBQVlBO0VBQ0U7SUFDRSxrQkFBQTtFQVRGOztFQVdGO0lBQ0UsbUJBQUE7RUFSQTs7RUFVRjtJQUNFLGdCQUFBO0VBUEE7O0VBVUY7SUFDQSxnQkFBQTtFQVBFOztFQVNGO0lBQ0UsaUJBQUE7SUFDQSxXQUFBO0lBQ0EsWUFBQTtFQU5BOztFQVFGO0lBQ0UsV0FBQTtJQUNBLFlBQUE7RUFMQTs7RUFPRjtJQUNFLGlCQUFBO0VBSkE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9hdXRoZW50aWNhdGlvbi9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjo6bmctZGVlcCB7XHJcbiAgLm1hdC1kaWFsb2ctY29udGVudCB7XHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgfVxyXG4gIC5tYXQtZGlhbG9nLWNvbnRhaW5lciB7XHJcbiAgICBcclxuICAgIC8vIHBhZGRpbmc6IHVuc2V0ICFpbXBvcnRhbnQ7XHJcbiAgfSBcclxuICAvLyAgIC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWZsZXgge1xyXG4gICAgLy8gICAgIHBhZGRpbmc6IDAgNDZweCAwIDAuNzVlbSAhaW1wb3J0YW50O1xyXG4gICAgLy8gfVxyXG4gIH1cclxuICAuZGlhbG9nQ29udGVudHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwjZTRlZGVkICAsICM3NDdhN2EpICFpbXBvcnRhbnQ7XHJcblxyXG59XHJcbi5oZWFkaW5nMntcclxuICBjb2xvcjogIzRDNEM0QztcclxuICAgIGZvbnQtZmFtaWx5OiBcIlBvcHBpbnNcIiwgcG9wcGlucztcclxuXHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuM2VtO1xyXG59XHJcblxyXG4uY29udGFpbmVye1xyXG4gIHdpZHRoOmF1dG87XHJcbiAgaGVpZ2h0OmF1dG87XHJcbiBcclxufVxyXG4ucm93e1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmhlYWRpbmcze1xyXG4gIGNvbG9yOiAjNEM0QzRDO1xyXG4gICAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiLCBwb3BwaW5zO1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjNlbTtcclxuICAgIHBhZGRpbmctbGVmdDogMHB4O1xyXG59XHJcbi5oZWFkaW5ne1xyXG4gIGNvbG9yOiAjNEM0QzRDO1xyXG4gICAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiLCBwb3BwaW5zO1xyXG4gICAgZm9udC1zaXplOiA0MHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUxNTtcclxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gICAgbGluZS1oZWlnaHQ6IDFlbTtcclxufVxyXG5cclxuLmg0e1xyXG4gIG1hcmdpbi1ib3R0b206IDBweDtcclxufVxyXG5cclxuI2J1dG57XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxufVxyXG4vKiAuY29udGFpbmVye1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGFiMTg7XHJcbn0gKi9cclxuIC5jYW5jZWxCdG57XHJcbiBjb2xvcjogIHdoaXRlO1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuICB9XHJcbkBtZWRpYSAobWluLXdpZHRoOiAxMjAwcHgpIHtcclxuICAuY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiA2MDBweDtcclxuXHJcbiAgfVxyXG59XHJcbi5sb2dve1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcblxyXG4gICNidG4xe1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjpibGFjaztcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICB9XHJcblxyXG4uc29jaWFsLWxpbmtzIHtcclxuICBwYWRkaW5nLWJvdHRvbTogMjBweDtcclxuICBwYWRkaW5nLXRvcDogMTBweDtcclxufVxyXG5cclxuXHJcblxyXG5cclxuYSB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi5mb2xsb3ctdXMge1xyXG4gIGNvbG9yOiAjNEM0QzRDO1xyXG4gICAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiLCBwb3BwaW5zO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gICAgbGluZS1oZWlnaHQ6IDFlbTtcclxufVxyXG5cclxuLm5vdGlmaWNhdGlvbiBpbWd7XHJcbiAgbWF4LWhlaWdodDogNXJlbTtcclxuICBtYXgtd2lkdGg6IDE2cmVtO1xyXG59XHJcblxyXG5pbWd7XHJcbiAgbWF4LWhlaWdodDogNXJlbTtcclxuICBtYXgtd2lkdGg6IDE2cmVtO1xyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCl7XHJcbiAgLnJvd3tcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG4ubG9naW5fbWFpbntcclxuICBtYXJnaW4tbGVmdDotMTRyZW0gO1xyXG59XHJcbm1hdC1mb3JtLWZpZWxke1xyXG4gIG1heC13aWR0aDogMjIwcHg7XHJcbn1cclxuXHJcbmgze1xyXG5taW4td2lkdGg6IDIwMHB4O1xyXG59XHJcbi5sb2dve1xyXG4gIG1hcmdpbi1sZWZ0OiA4MHB4O1xyXG4gIHdpZHRoOiA2MHB4O1xyXG4gIGhlaWdodDogYXV0b1xyXG59XHJcbi5pbWd7XHJcbiAgd2lkdGg6IDYwcHg7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG59XHJcbmgye1xyXG4gIG1hcmdpbi1sZWZ0OiA4MHB4O1xyXG59XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"],
        args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.scss']
            }]
    }], function () { return [{ type: _auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialog"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] }, { type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_9__["UtilService"] }]; }, null); })();


/***/ }),

/***/ "UNBT":
/*!****************************************************************!*\
  !*** ./src/app/component/authentication/error.interceptors.ts ***!
  \****************************************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _error_msg_error_msg_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./error-msg/error-msg.component */ "chv7");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");






class ErrorInterceptor {
    constructor(dialog) {
        this.dialog = dialog;
    }
    intercept(req, next) {
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["catchError"])((error) => {
            // console.log(error);
            let errorMessage = error.error.message;
            this.dialog.open(_error_msg_error_msg_component__WEBPACK_IMPORTED_MODULE_3__["ErrorMsgComponent"], { data: { message: errorMessage } });
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(error);
        }));
    }
}
ErrorInterceptor.ɵfac = function ErrorInterceptor_Factory(t) { return new (t || ErrorInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"])); };
ErrorInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: ErrorInterceptor, factory: ErrorInterceptor.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](ErrorInterceptor, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _component_authentication_payment_payment_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/authentication/payment/payment.component */ "fQ4N");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _component_header_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component/header/header.component */ "Pk+G");
/* harmony import */ var _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./component/footer/footer.component */ "xb3B");
/* harmony import */ var _pageComponent_home_page_home_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pageComponent/home-page/home-page.component */ "CBMx");
/* harmony import */ var _pageComponent_rating_component_rating_component_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pageComponent/rating-component/rating-component.component */ "s9j+");
/* harmony import */ var _pageComponent_course_component_course_component_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pageComponent/course-component/course-component.component */ "dHIS");
/* harmony import */ var _pageComponent_aboutus_aboutus_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pageComponent/aboutus/aboutus.component */ "kWPV");
/* harmony import */ var _pageComponent_team_team_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pageComponent/team/team.component */ "ZGUI");
/* harmony import */ var _pageComponent_testimonials_testimonials_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pageComponent/testimonials/testimonials.component */ "L3jg");
/* harmony import */ var _pageComponent_slider_slider_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pageComponent/slider/slider.component */ "uZWA");
/* harmony import */ var _pageComponent_course_detail_course_detail_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pageComponent/course-detail/course-detail.component */ "SuRV");
/* harmony import */ var _component_authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./component/authentication/signup/signup.component */ "4eZQ");
/* harmony import */ var _component_authentication_login_login_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./component/authentication/login/login.component */ "U5be");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _component_authentication_auth_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./component/authentication/auth.module */ "BZkP");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _component_enumkeyvalue_pipe__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./component/enumkeyvalue.pipe */ "a+px");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _pageComponent_video_menu_menu_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./pageComponent/video/menu/menu.component */ "tGXq");
/* harmony import */ var _pageComponent_video_videos_list_videos_list_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./pageComponent/video/videos-list/videos-list.component */ "JFQj");
/* harmony import */ var _angular_youtube_player__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/youtube-player */ "TIDI");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _pageComponent_video_video_player_video_player_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./pageComponent/video/video-player/video-player.component */ "NyhI");
/* harmony import */ var _pageComponent_report_section_report_section_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./pageComponent/report-section/report-section.component */ "iv+P");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _component_headermenu_headermenu_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./component/headermenu/headermenu.component */ "cdMo");
/* harmony import */ var _pageComponent_about_about_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./pageComponent/about/about.component */ "OGwY");
/* harmony import */ var _pageComponent_contact_contact_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./pageComponent/contact/contact.component */ "8vpz");
/* harmony import */ var _pageComponent_services_services_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./pageComponent/services/services.component */ "I4oE");
/* harmony import */ var _pageComponent_pricing_pricing_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./pageComponent/pricing/pricing.component */ "14eC");
/* harmony import */ var _pageComponent_milestone_milestone_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./pageComponent/milestone/milestone.component */ "F7Eq");
/* harmony import */ var _pageComponent_faq_faq_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./pageComponent/faq/faq.component */ "nUvK");
/* harmony import */ var _component_authentication_error_interceptors__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./component/authentication/error.interceptors */ "UNBT");
/* harmony import */ var _component_authentication_forgot_pass_forgot_pass_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./component/authentication/forgot-pass/forgot-pass.component */ "sWVo");
/* harmony import */ var _component_authentication_req_mail_req_mail_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./component/authentication/req-mail/req-mail.component */ "jnji");
/* harmony import */ var _component_authentication_profile_profile_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./component/authentication/profile/profile.component */ "y1GL");
/* harmony import */ var _component_authentication_success_msg_success_msg_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./component/authentication/success-msg/success-msg.component */ "8O3K");
/* harmony import */ var _component_authentication_error_msg_error_msg_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./component/authentication/error-msg/error-msg.component */ "chv7");
/* harmony import */ var _component_authentication_logout_msg_logout_msg_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./component/authentication/logout-msg/logout-msg.component */ "8dd4");
/* harmony import */ var _component_authentication_payment_service__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./component/authentication/payment.service */ "+wL8");
/* harmony import */ var _pageComponent_package_package_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./pageComponent/package/package.component */ "jcus");
/* harmony import */ var _pageComponent_awards_awards_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./pageComponent/awards/awards.component */ "q+By");

















































class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [{ provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"], useClass: _component_authentication_error_interceptors__WEBPACK_IMPORTED_MODULE_38__["ErrorInterceptor"], multi: true },
        _component_authentication_payment_service__WEBPACK_IMPORTED_MODULE_45__["PaymentService"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_19__["BrowserAnimationsModule"],
            _component_authentication_auth_module__WEBPACK_IMPORTED_MODULE_20__["AngularMaterialComponent"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_21__["ReactiveFormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_21__["FormsModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_23__["NgbModule"],
            _angular_youtube_player__WEBPACK_IMPORTED_MODULE_26__["YouTubePlayerModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_27__["FlexLayoutModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_30__["MatListModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_0__["MatIconModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _component_header_header_component__WEBPACK_IMPORTED_MODULE_7__["HeaderComponent"],
        _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_8__["FooterComponent"],
        _pageComponent_home_page_home_page_component__WEBPACK_IMPORTED_MODULE_9__["HomePageComponent"],
        _pageComponent_rating_component_rating_component_component__WEBPACK_IMPORTED_MODULE_10__["RatingComponentComponent"],
        _pageComponent_course_component_course_component_component__WEBPACK_IMPORTED_MODULE_11__["CourseComponentComponent"],
        _pageComponent_aboutus_aboutus_component__WEBPACK_IMPORTED_MODULE_12__["AboutusComponent"],
        _pageComponent_team_team_component__WEBPACK_IMPORTED_MODULE_13__["TeamComponent"],
        _pageComponent_testimonials_testimonials_component__WEBPACK_IMPORTED_MODULE_14__["TestimonialsComponent"],
        _pageComponent_slider_slider_component__WEBPACK_IMPORTED_MODULE_15__["SliderComponent"],
        _pageComponent_course_detail_course_detail_component__WEBPACK_IMPORTED_MODULE_16__["CourseDetailComponent"],
        _component_authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_17__["SignupComponent"],
        _component_authentication_login_login_component__WEBPACK_IMPORTED_MODULE_18__["LoginComponent"],
        _component_enumkeyvalue_pipe__WEBPACK_IMPORTED_MODULE_22__["EnumKeyValuePipe"],
        _pageComponent_video_menu_menu_component__WEBPACK_IMPORTED_MODULE_24__["MenuComponent"],
        _pageComponent_video_videos_list_videos_list_component__WEBPACK_IMPORTED_MODULE_25__["VideosListComponent"],
        _pageComponent_video_video_player_video_player_component__WEBPACK_IMPORTED_MODULE_28__["VideoPlayerComponent"],
        _pageComponent_report_section_report_section_component__WEBPACK_IMPORTED_MODULE_29__["ReportSectionComponent"],
        _component_headermenu_headermenu_component__WEBPACK_IMPORTED_MODULE_31__["HeadermenuComponent"],
        _pageComponent_about_about_component__WEBPACK_IMPORTED_MODULE_32__["AboutComponent"],
        _pageComponent_contact_contact_component__WEBPACK_IMPORTED_MODULE_33__["ContactComponent"],
        _pageComponent_services_services_component__WEBPACK_IMPORTED_MODULE_34__["ServicesComponent"],
        _pageComponent_milestone_milestone_component__WEBPACK_IMPORTED_MODULE_36__["MilestoneComponent"],
        _pageComponent_faq_faq_component__WEBPACK_IMPORTED_MODULE_37__["FaqComponent"],
        _component_authentication_forgot_pass_forgot_pass_component__WEBPACK_IMPORTED_MODULE_39__["ForgotPassComponent"],
        _component_authentication_req_mail_req_mail_component__WEBPACK_IMPORTED_MODULE_40__["ReqMailComponent"],
        _component_authentication_profile_profile_component__WEBPACK_IMPORTED_MODULE_41__["ProfileComponent"],
        _component_authentication_success_msg_success_msg_component__WEBPACK_IMPORTED_MODULE_42__["SuccessMsgComponent"],
        _component_authentication_error_msg_error_msg_component__WEBPACK_IMPORTED_MODULE_43__["ErrorMsgComponent"],
        _component_authentication_logout_msg_logout_msg_component__WEBPACK_IMPORTED_MODULE_44__["LogoutMsgComponent"],
        _component_authentication_payment_payment_component__WEBPACK_IMPORTED_MODULE_1__["PaymentComponent"],
        _pageComponent_package_package_component__WEBPACK_IMPORTED_MODULE_46__["PackageComponent"],
        _pageComponent_awards_awards_component__WEBPACK_IMPORTED_MODULE_47__["AwardsComponent"],
        _pageComponent_pricing_pricing_component__WEBPACK_IMPORTED_MODULE_35__["PricingComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_19__["BrowserAnimationsModule"],
        _component_authentication_auth_module__WEBPACK_IMPORTED_MODULE_20__["AngularMaterialComponent"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_21__["ReactiveFormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_21__["FormsModule"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_23__["NgbModule"],
        _angular_youtube_player__WEBPACK_IMPORTED_MODULE_26__["YouTubePlayerModule"],
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_27__["FlexLayoutModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_30__["MatListModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_0__["MatIconModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                    _component_header_header_component__WEBPACK_IMPORTED_MODULE_7__["HeaderComponent"],
                    _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_8__["FooterComponent"],
                    _pageComponent_home_page_home_page_component__WEBPACK_IMPORTED_MODULE_9__["HomePageComponent"],
                    _pageComponent_rating_component_rating_component_component__WEBPACK_IMPORTED_MODULE_10__["RatingComponentComponent"],
                    _pageComponent_course_component_course_component_component__WEBPACK_IMPORTED_MODULE_11__["CourseComponentComponent"],
                    _pageComponent_aboutus_aboutus_component__WEBPACK_IMPORTED_MODULE_12__["AboutusComponent"],
                    _pageComponent_team_team_component__WEBPACK_IMPORTED_MODULE_13__["TeamComponent"],
                    _pageComponent_testimonials_testimonials_component__WEBPACK_IMPORTED_MODULE_14__["TestimonialsComponent"],
                    _pageComponent_slider_slider_component__WEBPACK_IMPORTED_MODULE_15__["SliderComponent"],
                    _pageComponent_course_detail_course_detail_component__WEBPACK_IMPORTED_MODULE_16__["CourseDetailComponent"],
                    _component_authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_17__["SignupComponent"],
                    _component_authentication_login_login_component__WEBPACK_IMPORTED_MODULE_18__["LoginComponent"],
                    _component_enumkeyvalue_pipe__WEBPACK_IMPORTED_MODULE_22__["EnumKeyValuePipe"],
                    _pageComponent_video_menu_menu_component__WEBPACK_IMPORTED_MODULE_24__["MenuComponent"],
                    _pageComponent_video_videos_list_videos_list_component__WEBPACK_IMPORTED_MODULE_25__["VideosListComponent"],
                    _pageComponent_video_video_player_video_player_component__WEBPACK_IMPORTED_MODULE_28__["VideoPlayerComponent"],
                    _pageComponent_report_section_report_section_component__WEBPACK_IMPORTED_MODULE_29__["ReportSectionComponent"],
                    _component_headermenu_headermenu_component__WEBPACK_IMPORTED_MODULE_31__["HeadermenuComponent"],
                    _pageComponent_about_about_component__WEBPACK_IMPORTED_MODULE_32__["AboutComponent"],
                    _pageComponent_contact_contact_component__WEBPACK_IMPORTED_MODULE_33__["ContactComponent"],
                    _pageComponent_services_services_component__WEBPACK_IMPORTED_MODULE_34__["ServicesComponent"],
                    _pageComponent_milestone_milestone_component__WEBPACK_IMPORTED_MODULE_36__["MilestoneComponent"],
                    _pageComponent_faq_faq_component__WEBPACK_IMPORTED_MODULE_37__["FaqComponent"],
                    _component_authentication_forgot_pass_forgot_pass_component__WEBPACK_IMPORTED_MODULE_39__["ForgotPassComponent"],
                    _component_authentication_req_mail_req_mail_component__WEBPACK_IMPORTED_MODULE_40__["ReqMailComponent"],
                    _component_authentication_profile_profile_component__WEBPACK_IMPORTED_MODULE_41__["ProfileComponent"],
                    _component_authentication_success_msg_success_msg_component__WEBPACK_IMPORTED_MODULE_42__["SuccessMsgComponent"],
                    _component_authentication_error_msg_error_msg_component__WEBPACK_IMPORTED_MODULE_43__["ErrorMsgComponent"],
                    _component_authentication_logout_msg_logout_msg_component__WEBPACK_IMPORTED_MODULE_44__["LogoutMsgComponent"],
                    _component_authentication_payment_payment_component__WEBPACK_IMPORTED_MODULE_1__["PaymentComponent"],
                    _pageComponent_package_package_component__WEBPACK_IMPORTED_MODULE_46__["PackageComponent"],
                    _pageComponent_awards_awards_component__WEBPACK_IMPORTED_MODULE_47__["AwardsComponent"],
                    _pageComponent_pricing_pricing_component__WEBPACK_IMPORTED_MODULE_35__["PricingComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_19__["BrowserAnimationsModule"],
                    _component_authentication_auth_module__WEBPACK_IMPORTED_MODULE_20__["AngularMaterialComponent"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_21__["ReactiveFormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_21__["FormsModule"],
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_23__["NgbModule"],
                    _angular_youtube_player__WEBPACK_IMPORTED_MODULE_26__["YouTubePlayerModule"],
                    _angular_flex_layout__WEBPACK_IMPORTED_MODULE_27__["FlexLayoutModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                    _angular_material_list__WEBPACK_IMPORTED_MODULE_30__["MatListModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_0__["MatIconModule"]
                ],
                providers: [{ provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"], useClass: _component_authentication_error_interceptors__WEBPACK_IMPORTED_MODULE_38__["ErrorInterceptor"], multi: true },
                    _component_authentication_payment_service__WEBPACK_IMPORTED_MODULE_45__["PaymentService"]],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "ZGUI":
/*!******************************************************!*\
  !*** ./src/app/pageComponent/team/team.component.ts ***!
  \******************************************************/
/*! exports provided: TeamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamComponent", function() { return TeamComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class TeamComponent {
    constructor() { }
    ngOnInit() {
    }
}
TeamComponent.ɵfac = function TeamComponent_Factory(t) { return new (t || TeamComponent)(); };
TeamComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TeamComponent, selectors: [["app-team"]], decls: 53, vars: 0, consts: [[1, "space-medium", "bg-default", "pdb150"], [1, "container"], [1, "row"], [1, "col-md-12"], [1, "divider-line"], [1, "team-block"], [1, "section-title"], [1, "text-white"], [1, "col-lg-3", "col-md-3", "col-sm-6", "col-xs-12"], [1, "team-section"], [1, "team-img"], ["href", "#"], ["src", "../../../assets/images/team-1.jpg", "alt", "", 1, "img-circle"], [1, "team-content", "mt20"], [1, "team-title"], [1, "team-meta"], ["src", "../../../assets/images/team-2.jpg", "alt", "", 1, "img-circle"], ["src", "../../../assets/images/team-3.jpg", "alt", "", 1, "img-circle"], ["src", "../../../assets/images/team-4.jpg", "alt", "", 1, "img-circle"]], template: function TeamComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h1", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Meet Our Experts");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Velitconsectetur utleo velaoreet in bibendum felirbi iaculis iaculis dpibus.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "img", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "h3", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Lesley Dingle");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Instructor");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "img", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "h3", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "James Fipher");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Instructor");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "img", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "h3", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Richard Walker");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Instructor");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "img", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "h3", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Jimmie Wood");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Instructor");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvdGVhbS90ZWFtLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TeamComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-team',
                templateUrl: './team.component.html',
                styleUrls: ['./team.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "a+px":
/*!************************************************!*\
  !*** ./src/app/component/enumkeyvalue.pipe.ts ***!
  \************************************************/
/*! exports provided: EnumKeyValuePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnumKeyValuePipe", function() { return EnumKeyValuePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class EnumKeyValuePipe {
    transform(enm) {
        return Object.getOwnPropertyNames(enm).filter((e) => {
            return parseInt(e, 10) >= 0;
        }).map((e) => {
            return { key: enm[e], value: e };
        });
    }
}
EnumKeyValuePipe.ɵfac = function EnumKeyValuePipe_Factory(t) { return new (t || EnumKeyValuePipe)(); };
EnumKeyValuePipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "enumKeyValue", type: EnumKeyValuePipe, pure: true });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EnumKeyValuePipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{ name: 'enumKeyValue' }]
    }], null, null); })();


/***/ }),

/***/ "cdMo":
/*!**************************************************************!*\
  !*** ./src/app/component/headermenu/headermenu.component.ts ***!
  \**************************************************************/
/*! exports provided: HeadermenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeadermenuComponent", function() { return HeadermenuComponent; });
/* harmony import */ var _authentication_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../authentication/login/login.component */ "U5be");
/* harmony import */ var _authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../authentication/signup/signup.component */ "4eZQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/util/sessionStorageHelper */ "kBAY");
/* harmony import */ var src_app_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/util/SessionStoreKey.enum */ "Ogej");
/* harmony import */ var src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/util/page.enum */ "7yHB");
/* harmony import */ var src_app_component_authentication_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/component/authentication/enum */ "v6DW");
/* harmony import */ var _pageComponent_report_section_report_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pageComponent/report-section/report.enum */ "cyVU");
/* harmony import */ var _authentication_profile_profile_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../authentication/profile/profile.component */ "y1GL");
/* harmony import */ var _authentication_auth_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../authentication/auth.service */ "ddlN");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _enumkeyvalue_pipe__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../enumkeyvalue.pipe */ "a+px");




















function HeadermenuComponent_mat_list_option_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list-option", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeadermenuComponent_mat_list_option_8_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r6.goToPage(ctx_r6.Page.VIDEOS); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Videos");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function HeadermenuComponent_mat_selection_list_14_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-selection-list", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-list-option");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeadermenuComponent_mat_selection_list_14_Template_a_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const b_r8 = ctx.$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r9.openCourseDetails(b_r8.key); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const b_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](b_r8.key);
} }
function HeadermenuComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeadermenuComponent_div_32_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r11.Signup(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Signup");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function HeadermenuComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeadermenuComponent_div_33_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r13.Login(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function HeadermenuComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeadermenuComponent_div_34_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r15.profile(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function HeadermenuComponent_div_35_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeadermenuComponent_div_35_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r17.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class HeadermenuComponent {
    constructor(authService, matDialog, utilService, router) {
        this.authService = authService;
        this.matDialog = matDialog;
        this.utilService = utilService;
        this.router = router;
        this.displayType = _pageComponent_report_section_report_enum__WEBPACK_IMPORTED_MODULE_7__["report"];
        this.branches = src_app_component_authentication_enum__WEBPACK_IMPORTED_MODULE_6__["Branch"];
    }
    ngOnInit() {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusListener = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => this.userIsAuthenticated = isAuthenticated);
        this.Page = src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_5__["Page"];
    }
    Signup() {
        this.matDialog.open(_authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_1__["SignupComponent"]);
    }
    Login() {
        this.matDialog.open(_authentication_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"]);
    }
    logout() {
        this.authService.logout();
    }
    openCourseDetails(courseKey) {
        src_app_util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_3__["sessionStore"].set(src_app_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_4__["SessionStoreKey"].BRANCH, courseKey);
        let branchClass = courseKey.replace(/\s+/g, '-').toLowerCase();
        branchClass = branchClass === 'electronics-&-communication-engineering' ? 'ece' : branchClass;
        src_app_util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_3__["sessionStore"].set(src_app_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_4__["SessionStoreKey"].BRANCH_CLASS, branchClass);
        this.utilService.ScrollToTop();
        this.router.navigate([src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_5__["Page"].COURSE_DETAILS]);
    }
    goToPage(pageType) {
        this.utilService.ScrollToTop();
        this.router.navigate([pageType]);
    }
    goToBlog() {
        this.utilService.ScrollToTop();
        window.open(src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_5__["ExternalURLs"].BLOG, '_blank');
    }
    goToJoinUs() {
        this.utilService.ScrollToTop();
        window.open(src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_5__["ExternalURLs"].JOINUS, '_blank');
    }
    goToExpertPage() {
        this.utilService.ScrollToTop();
        window.open(src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_5__["ExternalURLs"].EXPERT, '_blank');
    }
    profile() {
        this.matDialog.open(_authentication_profile_profile_component__WEBPACK_IMPORTED_MODULE_8__["ProfileComponent"]);
    }
}
HeadermenuComponent.ɵfac = function HeadermenuComponent_Factory(t) { return new (t || HeadermenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_authentication_auth_service__WEBPACK_IMPORTED_MODULE_9__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_11__["UtilService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"])); };
HeadermenuComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: HeadermenuComponent, selectors: [["app-headermenu"]], decls: 36, vars: 9, consts: [["id", "mainDiv", 1, "mainDiv"], ["mat-button", "", "mat-dialog-close", ""], [1, "mainList", 3, "multiple"], ["mat-dialog-close", ""], ["title", "Home", 3, "click"], ["mat-dialog-close", "", 4, "ngIf"], ["id", "accordion"], ["mat-dialog-close", "", "class", "courseList", 4, "ngFor", "ngForOf"], ["target", "_blank", "title", "NinthSem Blog", 3, "click"], ["title", "About", 3, "click"], ["title", "", 3, "click"], ["title", "Industry Expert", 3, "click"], ["title", "Join Us", 3, "click"], [1, "align-center"], [4, "ngIf"], ["title", "Videos", 3, "click"], ["mat-dialog-close", "", 1, "courseList"], [3, "click"], ["mat-button", "", "mat-dialog-close", "", 3, "click"]], template: function HeadermenuComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-selection-list", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-list-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeadermenuComponent_Template_a_click_6_listener() { return ctx.goToPage(ctx.Page.HOME); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, HeadermenuComponent_mat_list_option_8_Template, 3, 0, "mat-list-option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "mat-accordion", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Courses");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, HeadermenuComponent_mat_selection_list_14_Template, 4, 1, "mat-selection-list", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](15, "enumKeyValue");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "mat-list-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeadermenuComponent_Template_a_click_17_listener() { return ctx.goToBlog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Blog");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "mat-list-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeadermenuComponent_Template_a_click_20_listener() { return ctx.goToPage(ctx.Page.ABOUT); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "About");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "mat-list-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeadermenuComponent_Template_a_click_23_listener() { return ctx.goToPage(ctx.Page.CONTACT); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "Contact");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "mat-list-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeadermenuComponent_Template_a_click_26_listener() { return ctx.goToExpertPage(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27, "Industry Experts");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "mat-list-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeadermenuComponent_Template_a_click_29_listener() { return ctx.goToJoinUs(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "Join Us");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](32, HeadermenuComponent_div_32_Template, 3, 0, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](33, HeadermenuComponent_div_33_Template, 3, 0, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](34, HeadermenuComponent_div_34_Template, 3, 0, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](35, HeadermenuComponent_div_35_Template, 3, 0, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("multiple", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.userIsAuthenticated);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](15, 7, ctx.branches));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.userIsAuthenticated);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.userIsAuthenticated);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.userIsAuthenticated);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.userIsAuthenticated);
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_13__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogClose"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__["MatIcon"], _angular_material_list__WEBPACK_IMPORTED_MODULE_15__["MatSelectionList"], _angular_material_list__WEBPACK_IMPORTED_MODULE_15__["MatListOption"], _angular_common__WEBPACK_IMPORTED_MODULE_16__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_17__["MatAccordion"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_17__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_17__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_17__["MatExpansionPanelTitle"], _angular_common__WEBPACK_IMPORTED_MODULE_16__["NgForOf"]], pipes: [_enumkeyvalue_pipe__WEBPACK_IMPORTED_MODULE_18__["EnumKeyValuePipe"]], styles: [".mainDiv[_ngcontent-%COMP%] {\r\n  width: 70vw;\r\n  max-height: 85vh;\r\n\r\n  background: transparent;\r\n}\r\n\r\nmat-selection-list[_ngcontent-%COMP%] {\r\n  margin: 2rem;\r\n  width: 90%;\r\n  height: 100%;\r\n}\r\n\r\n.mainList[_ngcontent-%COMP%] {\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\r\n}\r\n\r\nmat-list-option[_ngcontent-%COMP%] {\r\n  font-size: 4rem;\r\n  font-weight: 500;\r\n  font-family: \"Open Sans\", sans-serif;\r\n}\r\n\r\nmat-list-option[_ngcontent-%COMP%]:hover, mat-panel-title[_ngcontent-%COMP%]:hover {\r\n  color: #f0ab18;\r\n}\r\n\r\n.mat-expansion-panel-body[_ngcontent-%COMP%] {\r\n  padding: 0px;\r\n}\r\n\r\n  .mat-list-option:first-child .mat-pseudo-checkbox {\r\n  display: none;\r\n}\r\n\r\n.align-center[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: center;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n  .mat-expansion-panel-body {\r\n  margin-top: -20px;\r\n}\r\n\r\n.courseList[_ngcontent-%COMP%] {\r\n  margin: 0 2rem 0 0;\r\n  overflow-x: visible;\r\n}\r\n\r\n.courseList[_ngcontent-%COMP%]   mat-list-option[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n  padding-top: 10px;\r\n}\r\n\r\n.align-center[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n  font-size: 14px;\r\n  background: #f0ab18;\r\n  color: #fff;\r\n  border-radius: 50px;\r\n  margin: 0 0 0 30px;\r\n  padding: 5px 56px;\r\n  cursor: pointer;\r\n}\r\n\r\na[_ngcontent-%COMP%] {\r\n  text-decoration: none;\r\n  color: black;\r\n}\r\n\r\na[_ngcontent-%COMP%]:hover {\r\n  color: #f0ab18;\r\n}\r\n\r\n.align-center[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\r\n  background-color: #9babab;\r\n  color: white;\r\n}\r\n\r\n.align-center[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\r\n  margin: 1rem;\r\n}\r\n\r\nbutton[_ngcontent-%COMP%] {\r\n  justify-self: space-between;\r\n  margin-left: 80%;\r\n}\r\n\r\nbutton[_ngcontent-%COMP%]:hover {\r\n  color: #f0ab18;\r\n}\r\n\r\n\r\n\r\n.mat-expansion-panel[_ngcontent-%COMP%] {\r\n  box-shadow: none;\r\n  margin-left: -10px;\r\n  font-size: 4rem;\r\n  font-weight: 500;\r\n  font-family: \"Open Sans\", sans-serif;\r\n}\r\n\r\n.mat-expansion-panel-body[_ngcontent-%COMP%] {\r\n  padding-top: -40px;\r\n}\r\n\r\n.coursebtn[_ngcontent-%COMP%] {\r\n  margin-left: 0%;\r\n  font-size: inherit;\r\n  font-style: inherit;\r\n  \r\n  background: white;\r\n  font-weight: 100;\r\n}\r\n\r\n.courseList[_ngcontent-%COMP%]   mat-list-option[_ngcontent-%COMP%] {\r\n  font-size: 15px;\r\n  overflow-y: visible;\r\n}\r\n\r\n.courseList[_ngcontent-%COMP%]:nth-child(7) {\r\n  margin-top: 5px;\r\n}\r\n\r\n.courseList[_ngcontent-%COMP%]:nth-child(8) {\r\n  margin-top: 5px;\r\n}\r\n\r\nmat-expansion-panel-header[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%] {\r\n  font-size: 16px;\r\n  font-weight: 400;\r\n  font-family: \"Open Sans\", sans-serif;\r\n}\r\n\r\n@media (max-width: 576px) {\r\n  .courseList[_ngcontent-%COMP%]:nth-child(7) {\r\n    margin-top: 15px;\r\n  }\r\n  .courseList[_ngcontent-%COMP%]:nth-child(8) {\r\n    margin-top: 15px;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2hlYWRlcm1lbnUvaGVhZGVybWVudS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjs7RUFFaEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFVBQVU7RUFDVixZQUFZO0FBQ2Q7O0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixvQ0FBb0M7QUFDdEM7O0FBRUE7O0VBRUUsY0FBYztBQUNoQjs7QUFDQTtFQUNFLFlBQVk7QUFDZDs7QUFDQTtFQUNFLGFBQWE7QUFDZjs7QUFDQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLGVBQWU7QUFDakI7O0FBQ0E7RUFDRSxpQkFBaUI7QUFDbkI7O0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUNBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsZUFBZTtBQUNqQjs7QUFDQTtFQUNFLHFCQUFxQjtFQUNyQixZQUFZO0FBQ2Q7O0FBQ0E7RUFDRSxjQUFjO0FBQ2hCOztBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOztFQUVFOztBQUNGO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFDQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsZUFBZTtFQUNmLG1CQUFtQjtBQUNyQjs7QUFDQTtFQUNFLGVBQWU7QUFDakI7O0FBQ0E7RUFDRSxlQUFlO0FBQ2pCOztBQUNBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixvQ0FBb0M7QUFDdEM7O0FBQ0E7RUFDRTtJQUNFLGdCQUFnQjtFQUNsQjtFQUNBO0lBQ0UsZ0JBQWdCO0VBQ2xCO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvaGVhZGVybWVudS9oZWFkZXJtZW51LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbkRpdiB7XHJcbiAgd2lkdGg6IDcwdnc7XHJcbiAgbWF4LWhlaWdodDogODV2aDtcclxuXHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbm1hdC1zZWxlY3Rpb24tbGlzdCB7XHJcbiAgbWFyZ2luOiAycmVtO1xyXG4gIHdpZHRoOiA5MCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcbi5tYWluTGlzdCB7XHJcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxubWF0LWxpc3Qtb3B0aW9uIHtcclxuICBmb250LXNpemU6IDRyZW07XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBmb250LWZhbWlseTogXCJPcGVuIFNhbnNcIiwgc2Fucy1zZXJpZjtcclxufVxyXG5cclxubWF0LWxpc3Qtb3B0aW9uOmhvdmVyLFxyXG5tYXQtcGFuZWwtdGl0bGU6aG92ZXIge1xyXG4gIGNvbG9yOiAjZjBhYjE4O1xyXG59XHJcbi5tYXQtZXhwYW5zaW9uLXBhbmVsLWJvZHkge1xyXG4gIHBhZGRpbmc6IDBweDtcclxufVxyXG46Om5nLWRlZXAgLm1hdC1saXN0LW9wdGlvbjpmaXJzdC1jaGlsZCAubWF0LXBzZXVkby1jaGVja2JveCB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG4uYWxpZ24tY2VudGVyIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxufVxyXG46Om5nLWRlZXAgLm1hdC1leHBhbnNpb24tcGFuZWwtYm9keSB7XHJcbiAgbWFyZ2luLXRvcDogLTIwcHg7XHJcbn1cclxuLmNvdXJzZUxpc3Qge1xyXG4gIG1hcmdpbjogMCAycmVtIDAgMDtcclxuICBvdmVyZmxvdy14OiB2aXNpYmxlO1xyXG59XHJcbi5jb3Vyc2VMaXN0IG1hdC1saXN0LW9wdGlvbiBhIHtcclxuICBwYWRkaW5nLXRvcDogMTBweDtcclxufVxyXG4uYWxpZ24tY2VudGVyIGJ1dHRvbiB7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGJhY2tncm91bmQ6ICNmMGFiMTg7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICBtYXJnaW46IDAgMCAwIDMwcHg7XHJcbiAgcGFkZGluZzogNXB4IDU2cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbmEge1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBjb2xvcjogYmxhY2s7XHJcbn1cclxuYTpob3ZlciB7XHJcbiAgY29sb3I6ICNmMGFiMTg7XHJcbn1cclxuLmFsaWduLWNlbnRlciBidXR0b246aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM5YmFiYWI7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uYWxpZ24tY2VudGVyIGRpdiB7XHJcbiAgbWFyZ2luOiAxcmVtO1xyXG59XHJcblxyXG5idXR0b24ge1xyXG4gIGp1c3RpZnktc2VsZjogc3BhY2UtYmV0d2VlbjtcclxuICBtYXJnaW4tbGVmdDogODAlO1xyXG59XHJcblxyXG5idXR0b246aG92ZXIge1xyXG4gIGNvbG9yOiAjZjBhYjE4O1xyXG59XHJcblxyXG4vKi5tYXQtZm9ybS1maWVsZCArIC5tYXQtZm9ybS1maWVsZCB7XHJcbiAgbWFyZ2luLWxlZnQ6IDFweDtcclxufSovXHJcbi5tYXQtZXhwYW5zaW9uLXBhbmVsIHtcclxuICBib3gtc2hhZG93OiBub25lO1xyXG4gIG1hcmdpbi1sZWZ0OiAtMTBweDtcclxuICBmb250LXNpemU6IDRyZW07XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBmb250LWZhbWlseTogXCJPcGVuIFNhbnNcIiwgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuLm1hdC1leHBhbnNpb24tcGFuZWwtYm9keSB7XHJcbiAgcGFkZGluZy10b3A6IC00MHB4O1xyXG59XHJcbi5jb3Vyc2VidG4ge1xyXG4gIG1hcmdpbi1sZWZ0OiAwJTtcclxuICBmb250LXNpemU6IGluaGVyaXQ7XHJcbiAgZm9udC1zdHlsZTogaW5oZXJpdDtcclxuICAvKmxpbmUtaGVpZ2h0OiAyOyovXHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgZm9udC13ZWlnaHQ6IDEwMDtcclxufVxyXG4uY291cnNlTGlzdCBtYXQtbGlzdC1vcHRpb24ge1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICBvdmVyZmxvdy15OiB2aXNpYmxlO1xyXG59XHJcbi5jb3Vyc2VMaXN0Om50aC1jaGlsZCg3KSB7XHJcbiAgbWFyZ2luLXRvcDogNXB4O1xyXG59XHJcbi5jb3Vyc2VMaXN0Om50aC1jaGlsZCg4KSB7XHJcbiAgbWFyZ2luLXRvcDogNXB4O1xyXG59XHJcbm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyIG1hdC1wYW5lbC10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgZm9udC1mYW1pbHk6IFwiT3BlbiBTYW5zXCIsIHNhbnMtc2VyaWY7XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6IDU3NnB4KSB7XHJcbiAgLmNvdXJzZUxpc3Q6bnRoLWNoaWxkKDcpIHtcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgfVxyXG4gIC5jb3Vyc2VMaXN0Om50aC1jaGlsZCg4KSB7XHJcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](HeadermenuComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"],
        args: [{
                selector: 'app-headermenu',
                templateUrl: './headermenu.component.html',
                styleUrls: ['./headermenu.component.css']
            }]
    }], function () { return [{ type: _authentication_auth_service__WEBPACK_IMPORTED_MODULE_9__["AuthService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialog"] }, { type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_11__["UtilService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"] }]; }, null); })();


/***/ }),

/***/ "chv7":
/*!***************************************************************************!*\
  !*** ./src/app/component/authentication/error-msg/error-msg.component.ts ***!
  \***************************************************************************/
/*! exports provided: ErrorMsgComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorMsgComponent", function() { return ErrorMsgComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");






class ErrorMsgComponent {
    constructor(data, utilService) {
        this.data = data;
        this.utilService = utilService;
    }
    ngOnInit() {
        this.utilService.setLoaderStatus(false);
    }
}
ErrorMsgComponent.ɵfac = function ErrorMsgComponent_Factory(t) { return new (t || ErrorMsgComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_2__["UtilService"])); };
ErrorMsgComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ErrorMsgComponent, selectors: [["app-error-msg"]], decls: 8, vars: 1, consts: [["src", "/assets/images/ninthsemlogo.png", "alt", "img", 1, "align-center"], ["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "content"], ["mat-dialog-actions", ""], ["mat-button", "", "mat-dialog-close", ""]], template: function ErrorMsgComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Something went wrong.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.message);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], styles: [".mat-dialog-content {\n  overflow-x: hidden;\n  margin: auto;\n}\n  .content {\n  padding: 24px !important;\n}\nimg[_ngcontent-%COMP%] {\n  max-height: 5rem;\n  max-width: 16rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL2Vycm9yLW1zZy9lcnJvci1tc2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSxrQkFBQTtFQUNBLFlBQUE7QUFBSjtBQUVFO0VBQ0Usd0JBQUE7QUFBSjtBQUdBO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtBQUFGIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL2Vycm9yLW1zZy9lcnJvci1tc2cuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6Om5nLWRlZXAge1xyXG4gIC5tYXQtZGlhbG9nLWNvbnRlbnQge1xyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gIH1cclxuICAuY29udGVudCB7XHJcbiAgICBwYWRkaW5nOiAyNHB4ICFpbXBvcnRhbnQ7XHJcbiAgfSBcclxufVxyXG5pbWd7XHJcbiAgbWF4LWhlaWdodDogNXJlbTtcclxuICBtYXgtd2lkdGg6IDE2cmVtO1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ErrorMsgComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-error-msg',
                templateUrl: './error-msg.component.html',
                styleUrls: ['./error-msg.component.scss']
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }, { type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_2__["UtilService"] }]; }, null); })();


/***/ }),

/***/ "cyVU":
/*!*************************************************************!*\
  !*** ./src/app/pageComponent/report-section/report.enum.ts ***!
  \*************************************************************/
/*! exports provided: report, status_completed, status_inProgress, status_dataNotReceived, CourseType_LITE, CourseType_BASIC, CourseType_PREMIUM, MockTest_LITE, MockTest_BASIC, MockTest_PREMIUM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "report", function() { return report; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "status_completed", function() { return status_completed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "status_inProgress", function() { return status_inProgress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "status_dataNotReceived", function() { return status_dataNotReceived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseType_LITE", function() { return CourseType_LITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseType_BASIC", function() { return CourseType_BASIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseType_PREMIUM", function() { return CourseType_PREMIUM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MockTest_LITE", function() { return MockTest_LITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MockTest_BASIC", function() { return MockTest_BASIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MockTest_PREMIUM", function() { return MockTest_PREMIUM; });
const report = {
    videoEnable: true,
    opened: false,
    isMenuOpened: false,
    status_completed: "Completed",
    status_inProgress: "In progress",
    status_dataNotReceived: "User data not received"
};
const status_completed = {
    status: "Completed",
    btn: "Download"
};
const status_inProgress = {
    status: "In Progress",
    btn: "In Progress..."
};
const status_dataNotReceived = {
    status: "User data not received",
    btn: "Upload data"
};
const CourseType_LITE = [
    {
        "heading": "Mock Interview 1",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Interview 2",
        "status": "completed",
        "show": "View Result"
    }
];
const CourseType_BASIC = [
    {
        "heading": "Mock Interview 1",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Interview 2",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Interview 3",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Interview 4",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Interview 5",
        "status": "completed",
        "show": "View Result"
    }
];
const CourseType_PREMIUM = [
    {
        "heading": "Mock Interview 1",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Interview 2",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Interview 3",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Interview 4",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Interview 5",
        "status": "Scheduled on 23/10/2020",
        "show": "RESCHEDULED"
    },
    {
        "heading": "Mock Interview 6",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Interview 7",
        "status": "completed",
        "show": "View Result"
    }
];
// Mock tests
const MockTest_LITE = [
    {
        "heading": "Mock Test 1",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Test 2",
        "status": "completed",
        "show": "View Result"
    }
];
const MockTest_BASIC = [
    {
        "heading": "Mock Test 1",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Test 2",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Test 3",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Test 4",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Test 5",
        "status": "completed",
        "show": "View Result"
    }
];
const MockTest_PREMIUM = [
    {
        "heading": "Mock Test 1",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Test 2",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Test 3",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Test 4",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Test 5",
        "status": "Scheduled on 23/10/2020",
        "show": "RESCHEDULED"
    },
    {
        "heading": "Mock Test 6",
        "status": "completed",
        "show": "View Result"
    },
    {
        "heading": "Mock Test 7",
        "status": "completed",
        "show": "View Result"
    }
];


/***/ }),

/***/ "dHIS":
/*!******************************************************************************!*\
  !*** ./src/app/pageComponent/course-component/course-component.component.ts ***!
  \******************************************************************************/
/*! exports provided: CourseComponentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseComponentComponent", function() { return CourseComponentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/sessionStorageHelper */ "kBAY");
/* harmony import */ var _util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/SessionStoreKey.enum */ "Ogej");
/* harmony import */ var src_app_component_authentication_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/component/authentication/enum */ "v6DW");
/* harmony import */ var src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/util/page.enum */ "7yHB");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");








class CourseComponentComponent {
    constructor(router, utilService) {
        this.router = router;
        this.utilService = utilService;
        this.branches = src_app_component_authentication_enum__WEBPACK_IMPORTED_MODULE_3__["BranchKey"];
    }
    ngOnInit() {
    }
    openCourseDetails(courseKey) {
        this.utilService.ScrollToTop();
        _util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_1__["sessionStore"].set(_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_2__["SessionStoreKey"].BRANCH, courseKey);
        let branchClass = courseKey.replace(/\s+/g, '-').toLowerCase();
        branchClass = branchClass === 'electronics-&-communication-engineering' ? 'ece' : branchClass;
        _util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_1__["sessionStore"].set(_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_2__["SessionStoreKey"].BRANCH_CLASS, branchClass);
        this.router.navigate([src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_4__["Page"].COURSE_DETAILS]);
    }
}
CourseComponentComponent.ɵfac = function CourseComponentComponent_Factory(t) { return new (t || CourseComponentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_6__["UtilService"])); };
CourseComponentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CourseComponentComponent, selectors: [["app-course-component"]], decls: 78, vars: 0, consts: [[1, "container-fluid"], [1, "row"], [1, "serviceDiv", "text-center"], [1, "text-dark", "text-center"], [1, "col-lg-3", "col-md-6", "col-sm-6", "col-xs-12"], ["data-aos", "fade-right", 1, "course-bg"], [1, "course-content", "mech", "col-lg-12"], [1, "course-text"], [1, "course", 3, "click"], [1, "course-content", "electrical", "col-lg-12"], [1, "course-content", "chemical", "col-lg-12"], [1, "course-content", "metal", "col-lg-12"]], template: function CourseComponentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "COURSES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "EXPLORE OUR BRANCHES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CourseComponentComponent_Template_div_click_13_listener() { return ctx.openCourseDetails(ctx.branches.MECH); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Mechanical Engineering");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Power Plant Sector");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Automobile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Manufacturing");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "EPC");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Oil and Gas ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CourseComponentComponent_Template_div_click_32_listener() { return ctx.openCourseDetails(ctx.branches.ELECTRICAL); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Electrical Engineering");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Industrial Internet of Things (IIoT) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Electrical Automation ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Electrical Designing ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, " Electronics & Instrumentation ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CourseComponentComponent_Template_div_click_49_listener() { return ctx.openCourseDetails(ctx.branches.CHEMICAL); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "Chemical Engineering");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Pharmaceutical");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "Agrochemical");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Paint & Dye");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "Polymer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Cement");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, "Paper and FMCG");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "Petrochemical ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CourseComponentComponent_Template_div_click_72_listener() { return ctx.openCourseDetails(ctx.branches.MET); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Metallurgy Engineering");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, "Metallurgy Engineering Studies The Physical and Chemical Behaviour Of Metallic Elements, Their Inter-Metallic Compounds and Their Mixtures.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](77, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".container-fluid[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: auto;\r\n}\r\n\r\n.course-bg[_ngcontent-%COMP%] {\r\n    height: 500px;\r\n    margin: 1rem;\r\n    overflow: hidden;\r\n    cursor: pointer;\r\n    border-radius: 5px;\r\n    animation: animation1 3s;\r\n    -webkit-animation: animation1 3s;\r\n}\r\n\r\n.course-content[_ngcontent-%COMP%] {\r\n    height: 500px;\r\n    background-position: center;\r\n    background-size: cover;\r\n    transition: 2s;\r\n    -webkit-transition: 2s;\r\n    -moz-transition: 2s;\r\n    -ms-transition: 2s;\r\n    -o-transition: 2s;\r\n}\r\n\r\n.course-bg[_ngcontent-%COMP%]:hover   .course-content[_ngcontent-%COMP%] {\r\n    transform: scale(1.2);\r\n    -webkit-transform: scale(1.2);\r\n    -moz-transform: scale(1.2);\r\n    -ms-transform: scale(1.2);\r\n    -o-transform: scale(1.2);\r\n}\r\n\r\n.course-content[_ngcontent-%COMP%]   .course-text[_ngcontent-%COMP%] {\r\n    height: 100%;\r\n    width: auto;\r\n    position: absolute;\r\n}\r\n\r\n.course[_ngcontent-%COMP%] {\r\n    margin-top: 60%;\r\n    margin-bottom: 1rem;\r\n    height: auto;\r\n    margin-right: 2rem;\r\n    z-index: 10;\r\n    background: rgba(255, 255, 255, 0.9);\r\n    padding: 15px 30px;\r\n    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);\r\n    transition: 0.3s;\r\n    transition: ease-in-out 0.4s;\r\n    border-radius: 5px;\r\n}\r\n\r\n.course[_ngcontent-%COMP%]:hover {\r\n    transform: scale(0.9);\r\n    -webkit-transform: scale(0.9);\r\n    -moz-transform: scale(0.9);\r\n    -ms-transform: scale(0.9);\r\n    -o-transform: scale(0.9);\r\n    background-color: #F0AC2D;\r\n    color: white;\r\n}\r\n\r\n.course[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    font-family: \"Raleway\", sans-serif;\r\n    font-weight: 700;\r\n    text-align: center;\r\n}\r\n\r\n.course[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\r\n}\r\n\r\n.civil[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/card/civilEngineering.jpg');\r\n}\r\n\r\n.mech[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/card/mechanicalEngineering.jpg');\r\n}\r\n\r\n.chemical[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/card/chemical.jpg');\r\n}\r\n\r\n.biotech[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/card/bioTech.jpg');\r\n}\r\n\r\n.electrical[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/card/electricalEngineering.jpg');\r\n}\r\n\r\n.metal[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/card/metallurgy.png');\r\n}\r\n\r\n.bio[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/card/biotech.jpeg');\r\n}\r\n\r\n.ece[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/card/ece.jpg');\r\n}\r\n\r\n.aero[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/card/aero.jpg');\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    align-items: center;\r\n    margin-top: 5rem;\r\n    font-size: 32px;\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before, .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    margin: 1rem;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    padding: 0.3%;\r\n    font-size: 32px;\r\n}\r\n\r\n@-webkit-keyframes animation1 {\r\n    0% {\r\ntransition: .5 ease;\r\n        opacity: 0.4;\r\n        overflow: hidden;\r\n    }\r\n    100% {\r\n        transition: .5 ease;\r\n        opacity: 1;\r\n        overflow: hidden;\r\n    }\r\n}\r\n\r\n@keyframes animation1 {\r\n    0% {\r\ntransition: .5 ease;\r\n        opacity: 0.4;\r\n        overflow: hidden;\r\n    }\r\n    100% {\r\n        transition: .5 ease;\r\n        opacity: 1;\r\n        overflow: hidden;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9jb3Vyc2UtY29tcG9uZW50L2NvdXJzZS1jb21wb25lbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQix3QkFBd0I7SUFDeEIsZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDJCQUEyQjtJQUMzQixzQkFBc0I7SUFDdEIsY0FBYztJQUNkLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQiw2QkFBNkI7SUFDN0IsMEJBQTBCO0lBQzFCLHlCQUF5QjtJQUN6Qix3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsb0NBQW9DO0lBQ3BDLGtCQUFrQjtJQUNsQiwyQ0FBMkM7SUFDM0MsZ0JBQWdCO0lBQ2hCLDRCQUE0QjtJQUM1QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsNkJBQTZCO0lBQzdCLDBCQUEwQjtJQUMxQix5QkFBeUI7SUFDekIsd0JBQXdCO0lBQ3hCLHlCQUF5QjtJQUN6QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksa0NBQWtDO0lBQ2xDLGdCQUFnQjtJQUNoQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrTUFBa007QUFDdE07O0FBRUE7SUFDSSxpRUFBaUU7QUFDckU7O0FBRUE7SUFDSSxzRUFBc0U7QUFDMUU7O0FBRUE7SUFDSSx5REFBeUQ7QUFDN0Q7O0FBRUE7SUFDSSx3REFBd0Q7QUFDNUQ7O0FBRUE7SUFDSSxzRUFBc0U7QUFDMUU7O0FBRUE7SUFDSSwyREFBMkQ7QUFDL0Q7O0FBQ0E7SUFDSSx5REFBeUQ7QUFDN0Q7O0FBQ0E7SUFDSSxvREFBb0Q7QUFDeEQ7O0FBQ0E7SUFDSSxxREFBcUQ7QUFDekQ7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixlQUFlO0FBQ25COztBQUVBOztJQUVJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsZUFBZTtBQUNuQjs7QUFDQTtJQUNJO0FBQ0osbUJBQW1CO1FBQ1gsWUFBWTtRQUNaLGdCQUFnQjtJQUNwQjtJQUNBO1FBQ0ksbUJBQW1CO1FBQ25CLFVBQVU7UUFDVixnQkFBZ0I7SUFDcEI7QUFDSjs7QUFYQTtJQUNJO0FBQ0osbUJBQW1CO1FBQ1gsWUFBWTtRQUNaLGdCQUFnQjtJQUNwQjtJQUNBO1FBQ0ksbUJBQW1CO1FBQ25CLFVBQVU7UUFDVixnQkFBZ0I7SUFDcEI7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvY291cnNlLWNvbXBvbmVudC9jb3Vyc2UtY29tcG9uZW50LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyLWZsdWlkIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG59XHJcblxyXG4uY291cnNlLWJnIHtcclxuICAgIGhlaWdodDogNTAwcHg7XHJcbiAgICBtYXJnaW46IDFyZW07XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgYW5pbWF0aW9uOiBhbmltYXRpb24xIDNzO1xyXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGFuaW1hdGlvbjEgM3M7XHJcbn1cclxuXHJcbi5jb3Vyc2UtY29udGVudCB7XHJcbiAgICBoZWlnaHQ6IDUwMHB4O1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgIHRyYW5zaXRpb246IDJzO1xyXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiAycztcclxuICAgIC1tb3otdHJhbnNpdGlvbjogMnM7XHJcbiAgICAtbXMtdHJhbnNpdGlvbjogMnM7XHJcbiAgICAtby10cmFuc2l0aW9uOiAycztcclxufVxyXG5cclxuLmNvdXJzZS1iZzpob3ZlciAuY291cnNlLWNvbnRlbnQge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpO1xyXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMS4yKTtcclxuICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbiAgICAtby10cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbn1cclxuXHJcbi5jb3Vyc2UtY29udGVudCAuY291cnNlLXRleHQge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IGF1dG87XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbn1cclxuXHJcbi5jb3Vyc2Uge1xyXG4gICAgbWFyZ2luLXRvcDogNjAlO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIG1hcmdpbi1yaWdodDogMnJlbTtcclxuICAgIHotaW5kZXg6IDEwO1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpO1xyXG4gICAgcGFkZGluZzogMTVweCAzMHB4O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDJweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICAgIHRyYW5zaXRpb246IDAuM3M7XHJcbiAgICB0cmFuc2l0aW9uOiBlYXNlLWluLW91dCAwLjRzO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4uY291cnNlOmhvdmVyIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45KTtcclxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjkpO1xyXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDAuOSk7XHJcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgwLjkpO1xyXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgwLjkpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0YwQUMyRDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmNvdXJzZSBoMiB7XHJcbiAgICBmb250LWZhbWlseTogXCJSYWxld2F5XCIsIHNhbnMtc2VyaWY7XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uY291cnNlIHAge1xyXG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgQXJpYWwsIFwiTm90byBTYW5zXCIsIHNhbnMtc2VyaWYsIFwiQXBwbGUgQ29sb3IgRW1vamlcIiwgXCJTZWdvZSBVSSBFbW9qaVwiLCBcIlNlZ29lIFVJIFN5bWJvbFwiLCBcIk5vdG8gQ29sb3IgRW1vamlcIjtcclxufVxyXG5cclxuLmNpdmlsIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvY2FyZC9jaXZpbEVuZ2luZWVyaW5nLmpwZycpO1xyXG59XHJcblxyXG4ubWVjaCB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzL2NhcmQvbWVjaGFuaWNhbEVuZ2luZWVyaW5nLmpwZycpO1xyXG59XHJcblxyXG4uY2hlbWljYWwge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9jYXJkL2NoZW1pY2FsLmpwZycpO1xyXG59XHJcblxyXG4uYmlvdGVjaCB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzL2NhcmQvYmlvVGVjaC5qcGcnKTtcclxufVxyXG5cclxuLmVsZWN0cmljYWwge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9jYXJkL2VsZWN0cmljYWxFbmdpbmVlcmluZy5qcGcnKTtcclxufVxyXG5cclxuLm1ldGFsIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvY2FyZC9tZXRhbGx1cmd5LnBuZycpO1xyXG59XHJcbi5iaW8ge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9jYXJkL2Jpb3RlY2guanBlZycpO1xyXG59XHJcbi5lY2Uge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9jYXJkL2VjZS5qcGcnKTtcclxufVxyXG4uYWVybyB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzL2NhcmQvYWVyby5qcGcnKTtcclxufVxyXG5cclxuLnNlcnZpY2VEaXYge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogNXJlbTtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxufVxyXG5cclxuLnNlcnZpY2VEaXYgaDE6OmJlZm9yZSxcclxuLnNlcnZpY2VEaXYgaDE6OmFmdGVyIHtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDJweDtcclxuICAgIG1hcmdpbjogMXJlbTtcclxuICAgIGJhY2tncm91bmQ6ICNmMGFiMTg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5zZXJ2aWNlRGl2IGgxIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgcGFkZGluZzogMC4zJTtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxufVxyXG5Aa2V5ZnJhbWVzIGFuaW1hdGlvbjEge1xyXG4gICAgMCUge1xyXG50cmFuc2l0aW9uOiAuNSBlYXNlO1xyXG4gICAgICAgIG9wYWNpdHk6IDAuNDtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogLjUgZWFzZTtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB9XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CourseComponentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-course-component',
                templateUrl: './course-component.component.html',
                styleUrls: ['./course-component.component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }, { type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_6__["UtilService"] }]; }, null); })();


/***/ }),

/***/ "ddlN":
/*!**********************************************************!*\
  !*** ./src/app/component/authentication/auth.service.ts ***!
  \**********************************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../environments/environment */ "AytR");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _pageComponent_video_videos_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../pageComponent/video/videos.service */ "/n1y");







const BACKEND_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].Apiurl + "/users";
const PAYMENT_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].Apiurl + '/payment/';
class AuthService {
    constructor(http, router, videoService) {
        this.http = http;
        this.router = router;
        this.videoService = videoService;
        this.isAuthenticated = false;
        this.mailSent = false;
        this.changePassword = false;
        this.passwordChangeStatus = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.mailStatusListener = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.AuthStatusListener = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.signupStatusListener = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.signupStatus = false;
        this.email = '';
        this.packageDetails = {
            pkgName: '',
            pkgAmount: 0
        };
    }
    // signup status
    getSignupStatus() {
        return this.signupStatus;
    }
    getSignupStatusListener() {
        return this.signupStatusListener.asObservable();
    }
    // forgot mai sent 
    getMailSent() {
        return this.mailSent;
    }
    getMailStatusListener() {
        return this.mailStatusListener.asObservable();
    }
    // change Password 
    getChangePassword() {
        return this.changePassword;
    }
    getPassChangeStatus() {
        return this.passwordChangeStatus.asObservable();
    }
    // profile data
    getName() {
        return this.name;
    }
    getReport() {
        return this.http.get(BACKEND_URL + '/getreport');
    }
    Username() {
        return this.username;
    }
    RefferalCode() {
        return this.refferalCode;
    }
    setPackageDetails(pkgObject, cost) {
        this.packageDetails.pkgName = pkgObject.pkgName;
        this.packageDetails.pkgAmount = cost;
    }
    getPackageDetails() {
        return this.packageDetails;
    }
    Firstname() {
        return this.firstname;
    }
    getResponseMsg() {
        return this.message;
    }
    Lastname() {
        return this.lastname;
    }
    Gmail() {
        return this.Email;
    }
    Course() {
        return this.course;
    }
    userBranch() {
        return this.profileBranch;
    }
    userContactNumber() {
        return this.contactNumber;
    }
    userSignature() {
        return this.signature;
    }
    userPaymentId() {
        return this.paymentId;
    }
    getToken() {
        return this.token;
    }
    getIsAuth() {
        return this.isAuthenticated;
    }
    getUserId() {
        return this.userId;
    }
    getAuthStatusListener() {
        return this.AuthStatusListener.asObservable();
    }
    getEmail() {
        return this.purchasedBranch;
    }
    getBranchValue() {
        return this.getBranch().purchasedBranch;
    }
    // signup
    // tslint:disable-next-line: max-line-length
    createUser(username, firstname, lastname, password, email, contact, branch, course, graduationYear, college, refferalCode) {
        const authData = new FormData();
        //authData.append("image",image,username);
        authData.append('username', username);
        authData.append('firstname', firstname);
        authData.append('lastname', lastname);
        authData.append('email', email);
        authData.append('password', password);
        authData.append('contact', contact);
        authData.append('branch', branch);
        authData.append('course', course);
        authData.append('graduationYear', graduationYear);
        authData.append('college', college);
        authData.append('refferalCode', refferalCode);
        return this.http.post(BACKEND_URL + '/signup', authData).subscribe(response => {
            if (response.accessToken) {
                this.signupStatus = true;
                this.signupStatusListener.next(true);
                this.accessTokenTimer = setTimeout(() => {
                    this.signupStatus = false;
                }, 3600);
            }
        });
    }
    // login
    login(email, password) {
        const authData = { email, password };
        this.http.post(BACKEND_URL + '/login', authData)
            .subscribe(response => {
            console.log(response);
            const token = response.token;
            this.token = token;
            this.message = response.message;
            if (token) {
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.userId = response.userId;
                this.Email = response.email;
                this.paymentDetails(response.email);
                this.firstname = response.firstname;
                this.lastname = response.lastname;
                this.username = response.username;
                this.course = response.course;
                this.profileBranch = response.branch;
                this.refferalCode = response.refferalCode,
                    this.contactNumber = response.contact;
                this.signature = response.signature;
                this.paymentId = response.paymentId;
                this.AuthStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                this.saveAuthData(token, expirationDate, this.userId, this.Email, this.firstname, this.lastname, this.username, this.profileBranch, this.contactNumber, this.signature, this.paymentId, this.course, this.refferalCode);
                this.router.navigate(['/']);
                // console.log(this.isAuthenticated);
            }
        }, error => {
            this.AuthStatusListener.next(false);
        });
    }
    // req forgot password link to mail
    reqMail(email) {
        const data = { email };
        return this.http.put(BACKEND_URL + "/resetPass", data).subscribe(response => {
            if (response.success == true) {
                this.mailSent = true;
                this.mailStatusListener.next(true);
                this.mailTokemTimer = setTimeout(() => {
                    this.mailSent = false;
                }, 3600);
            }
            this.router.navigate(['/']);
        });
    }
    // forgot password 
    forgotPassword(password, id) {
        const data = { password, id };
        this.http.put(BACKEND_URL + "/resetPassword", data).subscribe(response => {
            if (response.success == true) {
                this.changePassword = true;
                this.passwordChangeStatus.next(true);
                this.passwordChangeTimer = setTimeout(() => {
                    this.changePassword = false;
                }, 3600);
            }
        });
    }
    autoAuthUser() {
        const authInformation = this.getAuthData();
        const branchInformation = this.getBranch();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.Email = authInformation.email;
            this.firstname = authInformation.firstname;
            this.lastname = authInformation.lastname;
            this.username = authInformation.username;
            this.course = authInformation.course;
            this.profileBranch = authInformation.profileBranch;
            this.contactNumber = authInformation.contactNumber;
            this.signature = authInformation.signature;
            this.paymentId = authInformation.paymentId;
            this.purchasedBranch = branchInformation.purchasedBranch;
            this.refferalCode = authInformation.refferalCode;
            this.setAuthTimer(expiresIn / 1000);
            this.AuthStatusListener.next(true);
        }
    }
    logout() {
        this.token = null;
        this.userId = null;
        this.Email = null;
        this.purchasedBranch = null;
        this.name = null;
        this.isAuthenticated = false;
        this.AuthStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearBranchData();
        this.clearAuthData();
        this.router.navigate(['/']);
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('payment');
        sessionStorage.removeItem('signature');
        localStorage.removeItem('basicCost');
        localStorage.removeItem('premiumCost');
        // sessionStorage.removeItem('isLoadedOnce');
    }
    // fetching pament details
    paymentDetails(email) {
        return this.http.get(PAYMENT_URL + email).subscribe(packagesData => {
            // console.log(packagesData);
            const now = new Date();
            const expiresInDuration = packagesData.expirationTime;
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            const purchasedbranch = packagesData.branch;
            this.saveBranchData(purchasedbranch, expirationDate);
            // console.log(packagesData.branch);
            this.setBranchTimer(expiresInDuration);
        });
    }
    setBranchTimer(duration) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }
    saveBranchData(purchasedBranch, expirationDate) {
        localStorage.setItem('purchasedBranch', purchasedBranch);
        localStorage.setItem('expiration', expirationDate.toString());
    }
    clearBranchData() {
        localStorage.removeItem('purchasedBranch');
        localStorage.removeItem('expiration');
    }
    getBranch() {
        const purchasedBranch = localStorage.getItem('purchasedBranch');
        const expirationDate = localStorage.getItem('expiration');
        return { purchasedBranch, expirationDate: new Date(expirationDate) };
    }
    setAuthTimer(duration) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }
    saveAuthData(token, expirationDate, userId, email, firstname, lastname, username, profileBranch, contactNumber, signature, paymentId, course, refferalCode) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toString());
        localStorage.setItem('userId', userId);
        localStorage.setItem('email', email);
        localStorage.setItem('firstname', firstname);
        localStorage.setItem('lastname', lastname);
        localStorage.setItem('username', username);
        localStorage.setItem('profileBranch', profileBranch);
        localStorage.setItem('contactNumber', contactNumber.toString());
        localStorage.setItem('signature', signature);
        localStorage.setItem('paymentId', paymentId);
        localStorage.setItem('course', course);
        localStorage.setItem('refferalCode', refferalCode);
    }
    clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('username');
        localStorage.removeItem('profileBranch');
        localStorage.removeItem('contactNumber');
        localStorage.removeItem('signature');
        localStorage.removeItem('paymentId');
        localStorage.removeItem('course');
    }
    getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
        const firstname = localStorage.getItem('firstname');
        const lastname = localStorage.getItem('lastname');
        const username = localStorage.getItem('username');
        const profileBranch = localStorage.getItem('profileBranch');
        const refferalCode = localStorage.getItem('refferalCode');
        const contactNumber = Number(localStorage.getItem('contactNumber'));
        const signature = localStorage.getItem('signature');
        const paymentId = localStorage.getItem('paymentId');
        const course = localStorage.getItem('course');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token,
            expirationDate: new Date(expirationDate),
            userId, email,
            firstname, lastname, username, profileBranch, contactNumber, signature, paymentId, course, refferalCode
        };
    }
    // contact us
    contactUs(name, email, subject, message) {
        const values = { name, email, subject, message };
        return this.http.post(BACKEND_URL + '/contactus', values);
    }
    http_post(url, body) {
        return this.http.post(PAYMENT_URL + url, body);
    }
    setPayment(paymentObject) {
        // console.log(_id, payment, signature);
        // const values = {
        //   _id: _id, payment: payment, signature: signature
        // };
        return this.http.post(PAYMENT_URL + 'payment', paymentObject);
    }
    http_delete(url, body) {
        // console.log(body);
        return this.http.delete(PAYMENT_URL + url, body);
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_pageComponent_video_videos_service__WEBPACK_IMPORTED_MODULE_5__["VideosService"])); };
AuthService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }, { type: _pageComponent_video_videos_service__WEBPACK_IMPORTED_MODULE_5__["VideosService"] }]; }, null); })();


/***/ }),

/***/ "fQ4N":
/*!***********************************************************************!*\
  !*** ./src/app/component/authentication/payment/payment.component.ts ***!
  \***********************************************************************/
/*! exports provided: PaymentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentComponent", function() { return PaymentComponent; });
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../enum */ "v6DW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../auth.service */ "ddlN");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _enumkeyvalue_pipe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../enumkeyvalue.pipe */ "a+px");

















function PaymentComponent_div_0_mat_error_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Please enter valid name !!! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function PaymentComponent_div_0_mat_error_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Enter Valid Email !");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function PaymentComponent_div_0_mat_error_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Select a Package !");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function PaymentComponent_div_0_mat_option_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const b_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("value", b_r13.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](b_r13.key);
} }
function PaymentComponent_div_0_mat_error_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Enter Valid Email !");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function PaymentComponent_div_0_mat_error_55_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Enter Valid Email !");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function PaymentComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "clear");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "h2", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Payment");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "form", null, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "mat-form-field", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Please enter your name");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "input", 10, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, PaymentComponent_div_0_mat_error_19_Template, 2, 0, "mat-error", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "mat-form-field", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Enter your email");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](24, "input", 13, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](26, PaymentComponent_div_0_mat_error_26_Template, 2, 0, "mat-error", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](27, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "mat-form-field", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Select Package");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "mat-select", 15, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "Lite - \u20B948");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "mat-option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "Basic - \u20B9998");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "mat-option", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "Premium -\u20B91498");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](39, PaymentComponent_div_0_mat_error_39_Template, 2, 0, "mat-error", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](40, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "mat-form-field", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "Select Branch");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "mat-select", 20, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](46, PaymentComponent_div_0_mat_option_46_Template, 2, 2, "mat-option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](47, "enumKeyValue");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](48, PaymentComponent_div_0_mat_error_48_Template, 2, 0, "mat-error", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](49, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "mat-form-field", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](52, "Your MobileNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](53, "input", 23, 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](55, PaymentComponent_div_0_mat_error_55_Template, 2, 0, "mat-error", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58, "Pay");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](60, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](61, "Follow us on");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](62, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](63, "a", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PaymentComponent_div_0_Template_a_click_63_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r14.openSocialMedia(ctx_r14.sm.TWITTER); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](64, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](65, "a", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PaymentComponent_div_0_Template_a_click_65_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r16.openSocialMedia(ctx_r16.sm.FACEBOOK); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](66, "i", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](67, "a", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PaymentComponent_div_0_Template_a_click_67_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r17.openSocialMedia(ctx_r17.sm.INSTAGRAM); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](68, "i", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](69, "a", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PaymentComponent_div_0_Template_a_click_69_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r18.openSocialMedia(ctx_r18.sm.LINKEDIN); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](70, "i", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](71, "a", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PaymentComponent_div_0_Template_a_click_71_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r19.openSocialMedia(ctx_r19.sm.YOUTUBE); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](72, "i", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](18);
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](25);
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](32);
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](45);
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](54);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r2.invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r4.invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r6.invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](47, 6, ctx_r0.branches));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r8.invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r11.invalid);
} }
class PaymentComponent {
    constructor(authService, matDialog, router, utilService) {
        this.authService = authService;
        this.matDialog = matDialog;
        this.router = router;
        this.utilService = utilService;
        this.branches = _enum__WEBPACK_IMPORTED_MODULE_0__["Branch"];
        this.hide = true;
        this.loginVisible = true;
        this.isLoading = false;
        this.customCard = '';
        this.outletDetail = {
            _id: ''
        };
        // tslint:disable-next-line:variable-name
        this.payment_creation_id = null;
        this.obj = {
            reciepient_name: '',
            reciepient_email: '',
            your_name: '',
            your_email: '',
            radioValue: 500,
            couponCount: 1,
            radioValueCustom: ''
        };
        this.razorPayOptions = {
            key: '',
            amount: '',
            currency: 'INR',
            name: '',
            branch: '',
            contact: '',
            email: '',
            description: 'favouright bill payment',
            order_id: '',
            image: 'https://ninthsem-a86d3.web.app/assets/images/ninthsemlogo.png',
            handler(response) {
                //   console.log('this is the response ');
            },
            notes: {
                address: 'Thank you for saving people in need'
            },
            theme: {
                color: '#F0C651'
            },
            http_post: this.authService
        };
        PaymentComponent.API_SERVICE = this.authService;
    }
    ngOnInit() {
        this.sm = _enum__WEBPACK_IMPORTED_MODULE_0__["SocialMediaTerms"];
    }
    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
    // onPay(form: NgForm) {
    //   if (form.invalid) {
    //     return;
    //   } else {
    //     this.payWithRazor(form);
    //     // this.router.navigate(['/']);
    //   }
    // }
    openSocialMedia(type) {
        return this.utilService.openSocialMedia(type);
    }
}
PaymentComponent.ɵfac = function PaymentComponent_Factory(t) { return new (t || PaymentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_5__["UtilService"])); };
PaymentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: PaymentComponent, selectors: [["app-payment"]], decls: 1, vars: 1, consts: [["class", "container", "mat-dialog-content", "", 4, "ngIf"], ["mat-dialog-content", "", 1, "container"], [1, "row"], [1, "col", 2, "text-align", "center"], ["mat-button", "", "mat-dialog-close", "", 1, "cancelBtn"], [1, "logo"], ["src", "assets/images/ninthsemlogo.png", 1, "img-responsive", 2, "width", "50%"], [1, "heading3", "text-center"], ["loginForm", "ngForm"], ["appearance", "outline"], ["name", "name", "ngModel", "", "type", "text", "matInput", "", "required", ""], ["nameInput", "ngModel"], [4, "ngIf"], ["matInput", "", "ngModel", "", "placeholder", "Email@example.com", "name", "email", "required", ""], ["emailInput", "ngModel"], ["name", "amount", "ngModel", "", "required", ""], ["packageInput", "ngModel"], ["value", "48"], ["value", "998"], ["value", "1498"], ["name", "branch", "ngModel", "", "required", ""], ["branchInput", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", "type", "tel", "name", "contact", "ngModel", "", "required", ""], ["contactInput", "ngModel"], ["type", "submit", "id", "btn1", 1, "btn"], [1, "myauto"], [1, "follow-us"], [1, "social-links"], ["target", "_blank", 1, "twitter", 3, "click"], [1, "icofont-twitter"], ["target", "_blank", 1, "facebook", 3, "click"], [1, "icofont-facebook"], ["target", "_blank", 1, "instagram", 3, "click"], [1, "icofont-instagram"], ["target", "_blank", 1, "linkedin", 3, "click"], [1, "icofont-linkedin"], [1, "icofont-youtube"], [3, "value"]], template: function PaymentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, PaymentComponent_div_0_Template, 73, 8, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loginVisible);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogContent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogClose"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIcon"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__["MatLabel"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["DefaultValueAccessor"], _angular_material_input__WEBPACK_IMPORTED_MODULE_11__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["RequiredValidator"], _angular_material_select__WEBPACK_IMPORTED_MODULE_12__["MatSelect"], _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["MatOption"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__["MatError"]], pipes: [_enumkeyvalue_pipe__WEBPACK_IMPORTED_MODULE_14__["EnumKeyValuePipe"]], styles: [".heading2[_ngcontent-%COMP%]{\r\n    color: #4C4C4C;\r\n      font-family: \"Poppins\", poppins;\r\n  \r\n      font-weight: 400;\r\n      line-height: 1.3em;\r\n  }\r\n  .container[_ngcontent-%COMP%]{\r\n    width:auto;\r\n    height:auto;\r\n    background-image: url(\"1.jpg\");\r\n    margin: 1rem;\r\n  }\r\n  .heading3[_ngcontent-%COMP%]{\r\n    color: #4C4C4C;\r\n      font-family: \"Poppins\", poppins;\r\n      font-size: 20px;\r\n      font-weight: 800;\r\n      line-height: 1.3em;\r\n      padding-left: 0px;\r\n  }\r\n  .heading[_ngcontent-%COMP%]{\r\n    color: #4C4C4C;\r\n      font-family: \"Poppins\", poppins;\r\n      font-size: 40px;\r\n      font-weight: 515;\r\n      text-transform: capitalize;\r\n      line-height: 1em;\r\n  }\r\n  .h4[_ngcontent-%COMP%]{\r\n    margin-bottom: 0px;\r\n  }\r\n  #butn[_ngcontent-%COMP%]{\r\n    margin-bottom: 30px;\r\n  }\r\n  \r\n  .cancelBtn[_ngcontent-%COMP%]{\r\n      float: right;\r\n      margin-top: 20px;\r\n    }\r\n  @media (min-width: 1200px) {\r\n    .container[_ngcontent-%COMP%] {\r\n      width: 600px;\r\n  \r\n    }\r\n  }\r\n  .logo[_ngcontent-%COMP%]{\r\n    margin-bottom: 10px;\r\n    margin-left: 30%;\r\n}\r\n  #btn1[_ngcontent-%COMP%]{\r\n    background-color: #ffe693;\r\n    color:black;\r\n  }\r\n  .social-links[_ngcontent-%COMP%] {\r\n    padding-bottom: 20px;\r\n    padding-top: 10px;\r\n  }\r\n  .social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    font-size: 18px;\r\n    display: inline-block;\r\n    background: #fff;\r\n    color: #f0ab18;\r\n    line-height: 1;\r\n    padding: 8px 0;\r\n    margin-right: 4px;\r\n    border-radius: 50%;\r\n    text-align: center;\r\n    width: 36px;\r\n    height: 36px;\r\n    transition: 0.3s;\r\n    border: 1px solid #f0ab18;\r\n  }\r\n  .social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\r\n    background: #f0ab18;\r\n    color: #fff;\r\n  }\r\n  a[_ngcontent-%COMP%] {\r\n    cursor: pointer;\r\n  }\r\n  .follow-us[_ngcontent-%COMP%] {\r\n    color: #4C4C4C;\r\n      font-family: \"Poppins\", poppins;\r\n      font-size: 18px;\r\n      font-weight: 600;\r\n      text-transform: capitalize;\r\n      line-height: 1em;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL3BheW1lbnQvcGF5bWVudC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksY0FBYztNQUNaLCtCQUErQjs7TUFFL0IsZ0JBQWdCO01BQ2hCLGtCQUFrQjtFQUN0QjtFQUNBO0lBQ0UsVUFBVTtJQUNWLFdBQVc7SUFDWCw4QkFBOEI7SUFDOUIsWUFBWTtFQUNkO0VBRUE7SUFDRSxjQUFjO01BQ1osK0JBQStCO01BQy9CLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsa0JBQWtCO01BQ2xCLGlCQUFpQjtFQUNyQjtFQUNBO0lBQ0UsY0FBYztNQUNaLCtCQUErQjtNQUMvQixlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLDBCQUEwQjtNQUMxQixnQkFBZ0I7RUFDcEI7RUFFQTtJQUNFLGtCQUFrQjtFQUNwQjtFQUVBO0lBQ0UsbUJBQW1CO0VBQ3JCO0VBQ0E7O0tBRUc7RUFDRjtNQUNHLFlBQVk7TUFDWixnQkFBZ0I7SUFDbEI7RUFDRjtJQUNFO01BQ0UsWUFBWTs7SUFFZDtFQUNGO0VBQ0E7SUFDRSxtQkFBbUI7SUFDbkIsZ0JBQWdCO0FBQ3BCO0VBRUU7SUFDRSx5QkFBeUI7SUFDekIsV0FBVztFQUNiO0VBQ0E7SUFDRSxvQkFBb0I7SUFDcEIsaUJBQWlCO0VBQ25CO0VBRUE7SUFDRSxlQUFlO0lBQ2YscUJBQXFCO0lBQ3JCLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsY0FBYztJQUNkLGNBQWM7SUFDZCxpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQix5QkFBeUI7RUFDM0I7RUFFQTtJQUNFLG1CQUFtQjtJQUNuQixXQUFXO0VBQ2I7RUFDQTtJQUNFLGVBQWU7RUFDakI7RUFDQTtJQUNFLGNBQWM7TUFDWiwrQkFBK0I7TUFDL0IsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQiwwQkFBMEI7TUFDMUIsZ0JBQWdCO0VBQ3BCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL3BheW1lbnQvcGF5bWVudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRpbmcye1xyXG4gICAgY29sb3I6ICM0QzRDNEM7XHJcbiAgICAgIGZvbnQtZmFtaWx5OiBcIlBvcHBpbnNcIiwgcG9wcGlucztcclxuICBcclxuICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgbGluZS1oZWlnaHQ6IDEuM2VtO1xyXG4gIH1cclxuICAuY29udGFpbmVye1xyXG4gICAgd2lkdGg6YXV0bztcclxuICAgIGhlaWdodDphdXRvO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiMS5qcGdcIik7XHJcbiAgICBtYXJnaW46IDFyZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5oZWFkaW5nM3tcclxuICAgIGNvbG9yOiAjNEM0QzRDO1xyXG4gICAgICBmb250LWZhbWlseTogXCJQb3BwaW5zXCIsIHBvcHBpbnM7XHJcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgZm9udC13ZWlnaHQ6IDgwMDtcclxuICAgICAgbGluZS1oZWlnaHQ6IDEuM2VtO1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDBweDtcclxuICB9XHJcbiAgLmhlYWRpbmd7XHJcbiAgICBjb2xvcjogIzRDNEM0QztcclxuICAgICAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiLCBwb3BwaW5zO1xyXG4gICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MTU7XHJcbiAgICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gICAgICBsaW5lLWhlaWdodDogMWVtO1xyXG4gIH1cclxuICBcclxuICAuaDR7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gICNidXRue1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICB9XHJcbiAgLyogLmNvbnRhaW5lcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMGFiMTg7XHJcbiAgfSAqL1xyXG4gICAuY2FuY2VsQnRue1xyXG4gICAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICB9XHJcbiAgQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xyXG4gICAgLmNvbnRhaW5lciB7XHJcbiAgICAgIHdpZHRoOiA2MDBweDtcclxuICBcclxuICAgIH1cclxuICB9XHJcbiAgLmxvZ297XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDMwJTtcclxufVxyXG4gIFxyXG4gICNidG4xe1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZTY5MztcclxuICAgIGNvbG9yOmJsYWNrO1xyXG4gIH1cclxuICAuc29jaWFsLWxpbmtzIHtcclxuICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xyXG4gICAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5zb2NpYWwtbGlua3MgYSB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgY29sb3I6ICNmMGFiMTg7XHJcbiAgICBsaW5lLWhlaWdodDogMTtcclxuICAgIHBhZGRpbmc6IDhweCAwO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA0cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aWR0aDogMzZweDtcclxuICAgIGhlaWdodDogMzZweDtcclxuICAgIHRyYW5zaXRpb246IDAuM3M7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZjBhYjE4O1xyXG4gIH1cclxuICBcclxuICAuc29jaWFsLWxpbmtzIGE6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gIH1cclxuICBhIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcbiAgLmZvbGxvdy11cyB7XHJcbiAgICBjb2xvcjogIzRDNEM0QztcclxuICAgICAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiLCBwb3BwaW5zO1xyXG4gICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gICAgICBsaW5lLWhlaWdodDogMWVtO1xyXG4gIH1cclxuICAiXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](PaymentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-payment',
                templateUrl: './payment.component.html',
                styleUrls: ['./payment.component.css']
            }]
    }], function () { return [{ type: _auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }, { type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_5__["UtilService"] }]; }, null); })();


/***/ }),

/***/ "fk7o":
/*!**************************************************************************************!*\
  !*** ./src/app/pageComponent/company/terms-of-service/terms-of-service.component.ts ***!
  \**************************************************************************************/
/*! exports provided: TermsOfServiceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsOfServiceComponent", function() { return TermsOfServiceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class TermsOfServiceComponent {
    constructor() { }
    ngOnInit() {
    }
}
TermsOfServiceComponent.ɵfac = function TermsOfServiceComponent_Factory(t) { return new (t || TermsOfServiceComponent)(); };
TermsOfServiceComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TermsOfServiceComponent, selectors: [["app-terms-of-service"]], decls: 87, vars: 0, consts: [[1, "inner-page"], [1, "container", "mainDiv"], ["data-aos", "fade-up", 1, "section-title"], [1, "container"], [1, "row"], [2, "list-style-type", "disc"], [1, "ull", 2, "list-style-type", "disc"], [1, "col-md-2"]], template: function TermsOfServiceComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Terms of Service");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Thank you for visiting ninthsem.net !");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "\nPlease read the Terms of Service (\u201CTerms\u201D, \u201CToS\u201D) carefully before using ninthsem.net\noperated by Avyukt Edutech Pvt. Ltd.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "ul", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Your access to our website and the use of services provided by our website is conditioned on your acceptance and further compliance with these terms. These terms apply to all visitors, udders and others who have access to our website. By accessing or using the service you agree to be bound by these terms. If you disagree with any part of these terms then you may not access the service.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " The services in the form of courses or lectures provided on ninthsem.net are owned and created by Avyukt Edutech Pvt. Ltd... When you visit our website and register yourself to have access to all services and products, you must provide us with all accurate and complete information. You are further responsible to update your information from time to time and keep it accurate.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " We at Avyukt Edutech Pvt. Ltd. grant you limited, non-transferable and revocable license to use our services. You may use data provided by us only for non-commercial use. You hereby agree to create and have access and use only one account per user. You agree to not share your access and security passwords to any third party for availing the services or information or any data.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " We at Avyukt Edutech Pvt. Ltd. have more than 500 video lectures and more than 50 passionate IEs with an average of 5-8 years industrial experience who makes these videos. Our aim is to provide efficient and quality information to you. However, we are not responsible if due to any inevitable circumstances, we are not able to provide you with data.\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " We will be providing both technical and non-technical certifications. However, unless specifically stated by a credit granting institution. Participation in or completion of any course or lecture series does not confer any academic credit.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " With regard to assignment submission, we at Ninthsem encourage punctuality, readiness and co-operation. Assignments or projects assigned to our users must be submitted on time and as per the demands of the course. All work submitted will reflect in the certificates granted by us. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "We welcome suggestions and feedbacks. By submitting any feedback on\nninthsem.net, you officially grant us the right to use the feedback so submitted\nwithout any restriction or consideration to you.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "By registering yourself on our website you have entered into a binding contract with Avyukt\nEdutech Pvt Ltd. With respect to this contract you shall be called the User and we will be\ntermed as the Service Provider.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "ul", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "As our user you are not permitted to make available any content that is misleading,\nharmful, defamatory, unlawful, invasive of anyone\u2019s privacy, with pornographic\nelements or against the public policy of the country.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Materials with elements of hate and racism are highly objectionable.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Users are prohibited from stalking and harassing other users.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "You are not entitled to store any material, date and information, except by the\nconsent of the concerned operator. You are entitled to download or store any\nmaterial protected by copyright and trademark laws. You are prohibited and not\nentitled to make available any data present on this website on any other digital\nplatform. You must not violate any terms mentioned in this document.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, " As mentioned above in the policy, we have our efficient team of lecturers building worth-learning presentation for our users. The user will have a proper medium to contact lecturers for any doubts or clarifications. Hence, you must not try to contact them in any other capacity or on any other platform.\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, " Regarding our live lectures, we will be providing you with medium such as the chat box to fill in your doubt. We expect you to adhere to all our policies while using your right to comment\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Your Content: By submitting any content on our website, you have officially granted us the license to use, copy, produce, modify or process such submission. We will associate your material with your name and other users will have such material accessible like any other content on our website.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Our Content: We have already mentioned about the accuracy of our content and our\nliability related to such accuracy. As of the content, information, trademarks, service marks,\ntrade names, images, video, audio and scripts are proprietary properties of Avyukt Edutech\nPvt. Ltd. This information cannot be copied, downloaded, transferred or uploaded on any\nother platform or in any other way without the prior information of the operators. Certain\ncontent belongs to third parties and it has been reproduced by us with their prior consent.\nAll rights relating to such content will remain with the third parties. You are not allowed, in\nany way, to download or copy such content.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "Our team at Avyukt Edutech Pvt. Ltd. will contact you for education information,\npromotions and updates via telephone or SMS. Such contact details are gathered from the\npersonal information that you provided and you hence personally granted us the right to\nhave access to such information.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "We at Avyukt Edutech Pvt. Ltd., are not liable for any damages incidental or consequential.\nWe are not liable for any loss incurred directly or indirectly in the form of loss of data or\ngoodwill or your inability to access our website. You acknowledge and agree that the\nlimitations above mentioned reflect a reasonable and fair allocation of risk between you and\nthe website operators.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "We constantly change and amend our policies and you are required to stay updated at all\ntimes. We may terminate your use of any service for any wrongful conduct or for nonpayment of required fees. In case of termination of paid-services, we will provide you with\nrefund. Please read our Payment and Refund Policy for important provisions regarding the\nsame. We will not be liable for any loss caused due to such termination.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "The services on this website are provided by Avyukt Edutech Pvt. Ltd. with its registered\noffice in Bubhaneswar, Orissa. Any dispute with regards to the above mentioned terms will\nbe governed by the existing laws of the Republic of India.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "We may revise, amend or delete terms as and when required, only to update our skills as an\norganization.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, " For any queries regarding our Terms of Service, please contact us.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Registered Address:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, " Avyukt Edutech Pvt. Ltd.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, " 404 Ashok Vatika");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, " Chakeisiani, Bhubaneswar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](78, "E-mail ID:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, " contact@ninthsem.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, "Contact No:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "+91 9437 855 859 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["section[_ngcontent-%COMP%] {\r\n    padding: 60px 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.section-bg[_ngcontent-%COMP%] {\r\n    background-color: #f7fbfe;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    padding-bottom: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    font-size: 32px;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n    position: relative;\r\n    color: #222222;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before, .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\r\n    margin: 0 15px 10px 0;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    margin: 0 0 10px 15px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin: 15px 0 0 0;\r\n}\r\n\r\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], b[_ngcontent-%COMP%]{\r\n    font-family: \"Raleway\", sans-serif;\r\n}\r\n\r\nli[_ngcontent-%COMP%]{\r\n    padding-bottom: 10px;\r\n}\r\n\r\n.ull[_ngcontent-%COMP%]{\r\n    margin-left: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    margin-bottom: 0px !important;\r\n}\r\n\r\n.mainDiv[_ngcontent-%COMP%]{\r\n    height: 50rem;\r\n    overflow-y: scroll;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9jb21wYW55L3Rlcm1zLW9mLXNlcnZpY2UvdGVybXMtb2Ytc2VydmljZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsa0JBQWtCO0lBQ2xCLGNBQWM7QUFDbEI7O0FBRUE7O0lBRUksV0FBVztJQUNYLFdBQVc7SUFDWCxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLDZCQUE2QjtBQUNqQzs7QUFDQTtJQUNJLGFBQWE7SUFDYixrQkFBa0I7QUFDdEIiLCJmaWxlIjoic3JjL2FwcC9wYWdlQ29tcG9uZW50L2NvbXBhbnkvdGVybXMtb2Ytc2VydmljZS90ZXJtcy1vZi1zZXJ2aWNlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuc2VjdGlvbiB7XHJcbiAgICBwYWRkaW5nOiA2MHB4IDA7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4uc2VjdGlvbi1iZyB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmYmZlO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMzBweDtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDIge1xyXG4gICAgZm9udC1zaXplOiAzMnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgY29sb3I6ICMyMjIyMjI7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjpiZWZvcmUsXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjphZnRlciB7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgaGVpZ2h0OiAycHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjBhYjE4O1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YmVmb3JlIHtcclxuICAgIG1hcmdpbjogMCAxNXB4IDEwcHggMDtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDI6OmFmdGVyIHtcclxuICAgIG1hcmdpbjogMCAwIDEwcHggMTVweDtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgcCB7XHJcbiAgICBtYXJnaW46IDE1cHggMCAwIDA7XHJcbn1cclxuXHJcbmgxLGgyLGgzLGg0LGg1LGg2LGJ7XHJcbiAgICBmb250LWZhbWlseTogXCJSYWxld2F5XCIsIHNhbnMtc2VyaWY7XHJcbn1cclxuXHJcbmxpe1xyXG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi51bGx7XHJcbiAgICBtYXJnaW4tbGVmdDogMzBweDtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLm1haW5EaXZ7XHJcbiAgICBoZWlnaHQ6IDUwcmVtO1xyXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TermsOfServiceComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-terms-of-service',
                templateUrl: './terms-of-service.component.html',
                styleUrls: ['./terms-of-service.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "iv+P":
/*!**************************************************************************!*\
  !*** ./src/app/pageComponent/report-section/report-section.component.ts ***!
  \**************************************************************************/
/*! exports provided: ReportSectionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportSectionComponent", function() { return ReportSectionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _report_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./report.enum */ "cyVU");
/* harmony import */ var _component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/authentication/auth.service */ "ddlN");
/* harmony import */ var _component_header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/header/header.component */ "Pk+G");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");







function ReportSectionComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h2", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const interview_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](interview_r2.heading);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](interview_r2.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](interview_r2.show);
} }
function ReportSectionComponent_div_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h2", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const test_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](test_r3.heading);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](test_r3.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](test_r3.show);
} }
class ReportSectionComponent {
    //@Input() report:boolean;
    constructor(service) {
        this.service = service;
        this.MockInterview = _report_enum__WEBPACK_IMPORTED_MODULE_1__["CourseType_PREMIUM"];
        this.MockTest = _report_enum__WEBPACK_IMPORTED_MODULE_1__["MockTest_PREMIUM"];
    }
    ngOnInit() {
        this.service.getReport()
            .subscribe(data => console.log(data));
    }
}
ReportSectionComponent.ɵfac = function ReportSectionComponent_Factory(t) { return new (t || ReportSectionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"])); };
ReportSectionComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ReportSectionComponent, selectors: [["app-report-section"]], decls: 38, vars: 2, consts: [[1, "container-fluid", "reportDiv"], [1, "container-fluid"], [1, "row"], [1, "serviceDiv", "text-center"], [1, "row", "mb40", "resumeLinkedinDiv"], [1, "card", "mb20", "ml20"], [1, "bg-darkYellow"], ["src", "../../../assets/images/completed.jpg", "alt", "Card image cap", 1, "card-img-top"], [1, "card-body", "mt20", "bg-lightYellow"], [1, "card-text", "text-center"], [1, "card", "mb20", "ml15"], ["src", "../../../assets/images/notdone.png", "alt", "Card image cap", 1, "card-img-top"], [1, "row", "mb40"], [1, "scrolling"], ["class", "card mockCard ", 4, "ngFor", "ngForOf"], ["class", "card mockCard mb40", 4, "ngFor", "ngForOf"], [1, "card", "mockCard"], [1, "card-body"], [1, "card-subtitle", "mt30", "mb20", "text-center"], ["routerLink", "/", 1, "card-link", "btn", "btn-primary", "mb20"], [1, "card", "mockCard", "mb40"]], template: function ReportSectionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Report");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Resume Building");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Completed.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Linkedin Profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "img", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "p", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "User data not received");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Mock Interviews");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, ReportSectionComponent_div_30_Template, 9, 3, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Mock Tests");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](37, ReportSectionComponent_div_37_Template, 9, 3, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.MockInterview);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.MockTest);
    } }, directives: [_component_header_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLinkWithHref"]], styles: [".ml15[_ngcontent-%COMP%]{\r\n  margin-left: 15%;\r\n}\r\n.ml20[_ngcontent-%COMP%]{\r\n  margin-left: 27%;\r\n}\r\n.reportDiv[_ngcontent-%COMP%]{\r\n  width: 100%;\r\n  display: block;\r\n  margin: 30px auto;\r\n  \r\n  \r\n}\r\n.reportDiv[_ngcontent-%COMP%]   .resumeLinkedinDiv[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]\r\n{\r\n  display: inline-block;\r\n\r\n}\r\n.reportHead[_ngcontent-%COMP%]{\r\n  width: 80%;\r\n  height:40px;\r\n}\r\n.reportHead[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{\r\n  display: block;\r\n  line-height: 40px;\r\n  width: 90%;\r\n  margin-left: 50%;\r\n}\r\n.card[_ngcontent-%COMP%]{\r\n\r\n  border-radius: 8px;\r\n  max-height: 270px;\r\n  max-width: 230px;\r\n  margin-top: 30px;\r\n  border: 1px solid black;\r\n}\r\n.card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{\r\n  display: block;\r\n  text-align: center;\r\n  border-bottom: 1px solid black;\r\n  border-top-left-radius: 5px;\r\n  border-top-right-radius: 5px;\r\n}\r\n.card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{\r\n  padding-top: 15px;\r\n}\r\n.card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n  max-height: 90px;\r\n  max-width: 25%;\r\n  margin-left: 34%;\r\n  margin-top: 10%; \r\n}\r\n.card-body[_ngcontent-%COMP%]{\r\n  border-bottom-left-radius: 5px;\r\n  border-bottom-right-radius: 5px;\r\n}\r\n.card-body[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]\r\n{\r\n  font-size: 16px;\r\n}\r\n.card-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n  padding-top:10px; \r\n  padding-bottom: 10px;\r\n  font-weight: bold;\r\n  font-size: 15px;\r\n}\r\n.mockHeading[_ngcontent-%COMP%]{\r\n  display: block;\r\n  width: 200px;\r\n  margin:auto;\r\n  height: 50px;\r\n  background: #f0ab18; \r\n  text-align: center;\r\n\r\n\r\n}\r\n.mockHeading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .mockHeading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{\r\n  line-height: 50px;\r\n\r\n}\r\n.scrolling[_ngcontent-%COMP%]{\r\n  overflow-x: scroll;\r\n  overflow-y: hidden;\r\n  white-space: nowrap;\r\n}\r\n.scrolling[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]\r\n{\r\n  display: inline-block;\r\n}\r\n.mockCard[_ngcontent-%COMP%]{\r\n  display: inline-block;\r\n  max-height: 300px;\r\n  min-width: 210px;\r\n  max-width: 210px;\r\n  margin-left: 5%;\r\n}\r\n.mockCard[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n  display: block;\r\n  width: 80%;\r\n  margin-left: 10%;\r\n  background: green;\r\n  font-size: 14px;\r\n  text-align:center;\r\n}\r\n.serviceDiv[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  align-items: center;\r\n  margin-top: 5rem;\r\n  font-size: 32px;\r\n}\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before, .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::after {\r\n  content: '';\r\n  width: 50px;\r\n  height: 2px;\r\n  margin: 1rem;\r\n  background: #f0ab18;\r\n  display: inline-block;\r\n}\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  font-weight: bold;\r\n  padding: 0.3%;\r\n  font-size: 32px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9yZXBvcnQtc2VjdGlvbi9yZXBvcnQtc2VjdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFFQTtFQUNFLFdBQVc7RUFDWCxjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLHVCQUF1QjtFQUN2QixxQkFBcUI7QUFDdkI7QUFDQTs7RUFFRSxxQkFBcUI7O0FBRXZCO0FBQ0E7RUFDRSxVQUFVO0VBQ1YsV0FBVztBQUNiO0FBQ0E7RUFDRSxjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLFVBQVU7RUFDVixnQkFBZ0I7QUFDbEI7QUFDQTs7RUFFRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLDhCQUE4QjtFQUM5QiwyQkFBMkI7RUFDM0IsNEJBQTRCO0FBQzlCO0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7QUFFQTtFQUNFLDhCQUE4QjtFQUM5QiwrQkFBK0I7QUFDakM7QUFDQTs7RUFFRSxlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsb0JBQW9CO0VBQ3BCLGlCQUFpQjtFQUNqQixlQUFlO0FBQ2pCO0FBRUE7RUFDRSxjQUFjO0VBQ2QsWUFBWTtFQUNaLFdBQVc7RUFDWCxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLGtCQUFrQjs7O0FBR3BCO0FBRUE7RUFDRSxpQkFBaUI7O0FBRW5CO0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtBQUNyQjtBQUNBOztFQUVFLHFCQUFxQjtBQUN2QjtBQUNBO0VBQ0UscUJBQXFCO0VBQ3JCLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7QUFFQTtFQUNFLGNBQWM7RUFDZCxVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsaUJBQWlCO0FBQ25CO0FBRUE7RUFDRSxXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixlQUFlO0FBQ2pCO0FBRUE7O0VBRUUsV0FBVztFQUNYLFdBQVc7RUFDWCxXQUFXO0VBQ1gsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixxQkFBcUI7QUFDdkI7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLGVBQWU7QUFDakIiLCJmaWxlIjoic3JjL2FwcC9wYWdlQ29tcG9uZW50L3JlcG9ydC1zZWN0aW9uL3JlcG9ydC1zZWN0aW9uLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWwxNXtcclxuICBtYXJnaW4tbGVmdDogMTUlO1xyXG59XHJcbi5tbDIwe1xyXG4gIG1hcmdpbi1sZWZ0OiAyNyU7XHJcbn1cclxuXHJcbi5yZXBvcnREaXZ7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWFyZ2luOiAzMHB4IGF1dG87XHJcbiAgLyogbWFyZ2luLXRvcDogLTMwcHg7ICovXHJcbiAgLyogbWFyZ2luLWxlZnQ6IDclOyAqL1xyXG59XHJcbi5yZXBvcnREaXYgLnJlc3VtZUxpbmtlZGluRGl2IC5jYXJkXHJcbntcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcblxyXG59XHJcbi5yZXBvcnRIZWFke1xyXG4gIHdpZHRoOiA4MCU7XHJcbiAgaGVpZ2h0OjQwcHg7XHJcbn1cclxuLnJlcG9ydEhlYWQgaDF7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbGluZS1oZWlnaHQ6IDQwcHg7XHJcbiAgd2lkdGg6IDkwJTtcclxuICBtYXJnaW4tbGVmdDogNTAlO1xyXG59XHJcbi5jYXJke1xyXG5cclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgbWF4LWhlaWdodDogMjcwcHg7XHJcbiAgbWF4LXdpZHRoOiAyMzBweDtcclxuICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xyXG59XHJcbi5jYXJkIHNwYW57XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcclxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XHJcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLmNhcmQgc3BhbiBoMntcclxuICBwYWRkaW5nLXRvcDogMTVweDtcclxufVxyXG4uY2FyZCBpbWd7XHJcbiAgbWF4LWhlaWdodDogOTBweDtcclxuICBtYXgtd2lkdGg6IDI1JTtcclxuICBtYXJnaW4tbGVmdDogMzQlO1xyXG4gIG1hcmdpbi10b3A6IDEwJTsgXHJcbn1cclxuXHJcbi5jYXJkLWJvZHl7XHJcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNXB4O1xyXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XHJcbn1cclxuLmNhcmQtYm9keSBoMlxyXG57XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG59XHJcbi5jYXJkLWJvZHkgcHtcclxuICBwYWRkaW5nLXRvcDoxMHB4OyBcclxuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbn1cclxuXHJcbi5tb2NrSGVhZGluZ3tcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogMjAwcHg7XHJcbiAgbWFyZ2luOmF1dG87XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIGJhY2tncm91bmQ6ICNmMGFiMTg7IFxyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcblxyXG59XHJcblxyXG4ubW9ja0hlYWRpbmcgaDIsLm1vY2tIZWFkaW5nIGgxe1xyXG4gIGxpbmUtaGVpZ2h0OiA1MHB4O1xyXG5cclxufVxyXG5cclxuLnNjcm9sbGluZ3tcclxuICBvdmVyZmxvdy14OiBzY3JvbGw7XHJcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuLnNjcm9sbGluZyAuY2FyZFxyXG57XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcbi5tb2NrQ2FyZHtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgbWF4LWhlaWdodDogMzAwcHg7XHJcbiAgbWluLXdpZHRoOiAyMTBweDtcclxuICBtYXgtd2lkdGg6IDIxMHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiA1JTtcclxufVxyXG5cclxuLm1vY2tDYXJkIC5jYXJkLWJvZHkgYXtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogODAlO1xyXG4gIG1hcmdpbi1sZWZ0OiAxMCU7XHJcbiAgYmFja2dyb3VuZDogZ3JlZW47XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIHRleHQtYWxpZ246Y2VudGVyO1xyXG59XHJcblxyXG4uc2VydmljZURpdiB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tdG9wOiA1cmVtO1xyXG4gIGZvbnQtc2l6ZTogMzJweDtcclxufVxyXG5cclxuLnNlcnZpY2VEaXYgaDE6OmJlZm9yZSxcclxuLnNlcnZpY2VEaXYgaDE6OmFmdGVyIHtcclxuICBjb250ZW50OiAnJztcclxuICB3aWR0aDogNTBweDtcclxuICBoZWlnaHQ6IDJweDtcclxuICBtYXJnaW46IDFyZW07XHJcbiAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5zZXJ2aWNlRGl2IGgxIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgcGFkZGluZzogMC4zJTtcclxuICBmb250LXNpemU6IDMycHg7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ReportSectionComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-report-section',
                templateUrl: './report-section.component.html',
                styleUrls: ['./report-section.component.css']
            }]
    }], function () { return [{ type: _component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }]; }, null); })();


/***/ }),

/***/ "izIa":
/*!**************************************!*\
  !*** ./src/app/util/util.service.ts ***!
  \**************************************/
/*! exports provided: UtilService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilService", function() { return UtilService; });
/* harmony import */ var src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/util/page.enum */ "7yHB");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");






// import * as GLOBAL from '../utils/globals';
class UtilService {
    constructor(http, route, platformId) {
        this.http = http;
        this.route = route;
        this.platformId = platformId;
    }
    isMobileView() {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            return window.innerWidth <= 767;
        }
    }
    isBrowserPlatform() {
        return Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId);
    }
    isMobTabViewForNav() {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            return window.innerWidth >= 768 && window.innerWidth <= 1100;
        }
    }
    isDeskTopViewForNav() {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            return window.innerWidth >= 1101;
        }
    }
    isMobTabView() {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            return window.innerWidth >= 768 && window.innerWidth <= 1371;
        }
    }
    isDeskTopView() {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            return window.innerWidth > 1371;
        }
    }
    ScrollToTop() {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }
    ScrollToBottom() {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
    openSocialMedia(type) {
        this.ScrollToTop();
        const URL = src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_0__["ExternalURLs"][type];
        window.open(URL, '_blank');
    }
    getLoaderStatus() {
        return this.loaderStatus;
    }
    setLoaderStatus(status) {
        this.loaderStatus = status;
    }
}
UtilService.ɵfac = function UtilService_Factory(t) { return new (t || UtilService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])); };
UtilService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: UtilService, factory: UtilService.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](UtilService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }, { type: Object, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"]]
            }] }]; }, null); })();


/***/ }),

/***/ "jcus":
/*!************************************************************!*\
  !*** ./src/app/pageComponent/package/package.component.ts ***!
  \************************************************************/
/*! exports provided: PackageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PackageComponent", function() { return PackageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _component_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component/header/header.component */ "Pk+G");
/* harmony import */ var _pricing_pricing_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pricing/pricing.component */ "14eC");
/* harmony import */ var _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/footer/footer.component */ "xb3B");





class PackageComponent {
    constructor() { }
    ngOnInit() {
    }
}
PackageComponent.ɵfac = function PackageComponent_Factory(t) { return new (t || PackageComponent)(); };
PackageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PackageComponent, selectors: [["app-package"]], decls: 3, vars: 0, template: function PackageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-pricing");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-footer");
    } }, directives: [_component_header_header_component__WEBPACK_IMPORTED_MODULE_1__["HeaderComponent"], _pricing_pricing_component__WEBPACK_IMPORTED_MODULE_2__["PricingComponent"], _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvcGFja2FnZS9wYWNrYWdlLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PackageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-package',
                templateUrl: './package.component.html',
                styleUrls: ['./package.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "jnji":
/*!*************************************************************************!*\
  !*** ./src/app/component/authentication/req-mail/req-mail.component.ts ***!
  \*************************************************************************/
/*! exports provided: ReqMailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReqMailComponent", function() { return ReqMailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth.service */ "ddlN");
/* harmony import */ var _util_util_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../util/util.service */ "izIa");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");











function ReqMailComponent_div_0_mat_spinner_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-spinner");
} }
function ReqMailComponent_div_0_div_2_mat_error_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Enter valid Email !!! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ReqMailComponent_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Enter Your Registered Email !");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "form", 4, 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function ReqMailComponent_div_0_div_2_Template_form_submit_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r7.reqMail(_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-form-field", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "input", 7, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ReqMailComponent_div_0_div_2_mat_error_11_Template, 2, 0, "mat-error", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Submit");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r5.invalid);
} }
function ReqMailComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ReqMailComponent_div_0_mat_spinner_1_Template, 1, 0, "mat-spinner", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ReqMailComponent_div_0_div_2_Template, 16, 1, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.getLoaderStatus());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.getLoaderStatus());
} }
function ReqMailComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Please check you email box to reset the password.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class ReqMailComponent {
    constructor(authservice, utilService) {
        this.authservice = authservice;
        this.utilService = utilService;
        this.isSuccess = false;
        this.isLoading = false;
    }
    ngOnInit() {
        this.isSuccess = this.authservice.getMailSent();
        this.mailStatusListener = this.authservice.getMailStatusListener().subscribe(isSent => {
            this.isLoading = false,
                this.isSuccess = isSent;
        });
    }
    reqMail(form) {
        if (form.valid) {
            this.authservice.reqMail(form.value.mail);
            this.utilService.setLoaderStatus(true);
            // this.isLoading = true;
            this.isSuccess = false;
        }
        else {
            this.utilService.setLoaderStatus(false);
            // this.isLoading = false;
            return;
        }
    }
    getLoaderStatus() {
        return this.utilService.getLoaderStatus();
    }
}
ReqMailComponent.ɵfac = function ReqMailComponent_Factory(t) { return new (t || ReqMailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_util_util_service__WEBPACK_IMPORTED_MODULE_2__["UtilService"])); };
ReqMailComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ReqMailComponent, selectors: [["app-req-mail"]], decls: 2, vars: 2, consts: [[4, "ngIf"], ["src", "/assets/images/ninthsemlogo.png", "alt", "img", 1, "align-center"], ["mat-dialog-title", ""], ["mat-dialog-content", ""], [3, "submit"], ["loginForm", "ngForm"], ["appearance", "outline"], ["name", "mail", "ngModel", "", "type", "email", "matInput", "", "placeholder", "Please enter Your registered email", "required", "", "minlength", "8"], ["emailInput", "ngModel"], ["type", "submit", "id", "btn1", 1, "btn"], ["mat-dialog-actions", ""], ["mat-button", "", "mat-dialog-close", ""]], template: function ReqMailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ReqMailComponent_div_0_Template, 3, 2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ReqMailComponent_div_1_Template, 6, 0, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isSuccess);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isSuccess);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_4__["MatSpinner"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialogContent"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["MinLengthValidator"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatError"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialogClose"]], styles: ["img[_ngcontent-%COMP%]{\r\n    max-height: 5rem;\r\n    max-width: 16rem;\r\n  }\r\n  #btn1[_ngcontent-%COMP%]{\r\n    background-color: #ffe693;\r\n    color:black;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL3JlcS1tYWlsL3JlcS1tYWlsLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGdCQUFnQjtFQUNsQjtFQUNBO0lBQ0UseUJBQXlCO0lBQ3pCLFdBQVc7RUFDYiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9hdXRoZW50aWNhdGlvbi9yZXEtbWFpbC9yZXEtbWFpbC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltZ3tcclxuICAgIG1heC1oZWlnaHQ6IDVyZW07XHJcbiAgICBtYXgtd2lkdGg6IDE2cmVtO1xyXG4gIH1cclxuICAjYnRuMXtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmU2OTM7XHJcbiAgICBjb2xvcjpibGFjaztcclxuICB9XHJcbiAgIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ReqMailComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-req-mail',
                templateUrl: './req-mail.component.html',
                styleUrls: ['./req-mail.component.css']
            }]
    }], function () { return [{ type: _auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }, { type: _util_util_service__WEBPACK_IMPORTED_MODULE_2__["UtilService"] }]; }, null); })();


/***/ }),

/***/ "kBAY":
/*!**********************************************!*\
  !*** ./src/app/util/sessionStorageHelper.ts ***!
  \**********************************************/
/*! exports provided: sessionStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sessionStore", function() { return sessionStore; });
function set(key, value) {
    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(key, value);
    }
    return value;
}
function get(key) {
    if (typeof sessionStorage !== 'undefined') {
        return sessionStorage.getItem(key);
    }
    return null;
}
function clear() {
    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
    }
}
function remove(key) {
    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(key);
    }
}
const sessionStore = {
    set,
    get,
    clear,
    remove
};


/***/ }),

/***/ "kWPV":
/*!************************************************************!*\
  !*** ./src/app/pageComponent/aboutus/aboutus.component.ts ***!
  \************************************************************/
/*! exports provided: AboutusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutusComponent", function() { return AboutusComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class AboutusComponent {
    constructor() { }
    ngOnInit() {
    }
}
AboutusComponent.ɵfac = function AboutusComponent_Factory(t) { return new (t || AboutusComponent)(); };
AboutusComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AboutusComponent, selectors: [["app-aboutus"]], decls: 38, vars: 0, consts: [[1, "container-fluid"], [1, "row"], [1, "serviceDiv", "text-center"], [1, "text-dark", "text-center"], [1, "container-fluid", "bg-lightYellow"], [1, "col-lg-3", "col-md-6", "col-sm-6", "col-xs-6"], [1, "services-block"], ["src", "../../assets/images/play1.png", 1, "mt20"], [1, "mt10"], ["src", "../../assets/images/question-mark.png", 1, "mt20"], ["src", "../../assets/images/teacher.png", 1, "mt20"], ["src", "../../assets/images/medal.png", 1, "mt-10"]], template: function AboutusComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "SERVICES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "We came up with variety of services to help you out");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "h2", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Lecture Sessions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Both recorded and live sessions are available.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "h2", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Weekly Q&S");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Now solve all your doubt and queries via weekly Q&S.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "h2", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Placement Guidance");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Get Placement Guidance from top subject matter experts");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "img", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Certifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Get certified for whatever you learn from us.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".about[_ngcontent-%COMP%] {\r\n    margin: 3%;\r\n}\r\n\r\n.about-section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    font-weight: bold;\r\n    padding: 3%;\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    align-items: center;\r\n    margin-top: 5rem;\r\n    font-size: 32px;\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before, .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    margin: 1rem;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    padding: 0.3%;\r\n    font-size: 32px;\r\n}\r\n\r\n.services-block[_ngcontent-%COMP%] {\r\n    max-width: 82%;\r\n    max-height: 400px;\r\n    min-height: 220px;\r\n    border: 1px solid black;\r\n    z-index: 1;\r\n    border-radius: 15px;\r\n    text-align: center;\r\n    text-overflow: none;\r\n    transition: transform 0.5s;\r\n    margin: 9%;\r\n    cursor: pointer;\r\n}\r\n\r\n.services-block[_ngcontent-%COMP%]:hover {\r\n    background: #F0AC2D;\r\n    direction: ltr;\r\n    color: white;\r\n    transform: scale(1.15);\r\n}\r\n\r\n.services-block[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin-left: 5px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9hYm91dHVzL2Fib3V0dXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixlQUFlO0FBQ25COztBQUVBOztJQUVJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLHVCQUF1QjtJQUN2QixVQUFVO0lBQ1YsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsMEJBQTBCO0lBQzFCLFVBQVU7SUFDVixlQUFlO0FBQ25COztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxZQUFZO0lBQ1osc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6InNyYy9hcHAvcGFnZUNvbXBvbmVudC9hYm91dHVzL2Fib3V0dXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hYm91dCB7XHJcbiAgICBtYXJnaW46IDMlO1xyXG59XHJcblxyXG4uYWJvdXQtc2VjdGlvbiBkaXYgaDEge1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBwYWRkaW5nOiAzJTtcclxufVxyXG5cclxuLnNlcnZpY2VEaXYge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogNXJlbTtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxufVxyXG5cclxuLnNlcnZpY2VEaXYgaDE6OmJlZm9yZSxcclxuLnNlcnZpY2VEaXYgaDE6OmFmdGVyIHtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDJweDtcclxuICAgIG1hcmdpbjogMXJlbTtcclxuICAgIGJhY2tncm91bmQ6ICNmMGFiMTg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5zZXJ2aWNlRGl2IGgxIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgcGFkZGluZzogMC4zJTtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxufVxyXG5cclxuLnNlcnZpY2VzLWJsb2NrIHtcclxuICAgIG1heC13aWR0aDogODIlO1xyXG4gICAgbWF4LWhlaWdodDogNDAwcHg7XHJcbiAgICBtaW4taGVpZ2h0OiAyMjBweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xyXG4gICAgei1pbmRleDogMTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB0ZXh0LW92ZXJmbG93OiBub25lO1xyXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXM7XHJcbiAgICBtYXJnaW46IDklO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uc2VydmljZXMtYmxvY2s6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogI0YwQUMyRDtcclxuICAgIGRpcmVjdGlvbjogbHRyO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjE1KTtcclxufVxyXG5cclxuLnNlcnZpY2VzLWJsb2NrIHAge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AboutusComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-aboutus',
                templateUrl: './aboutus.component.html',
                styleUrls: ['./aboutus.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "lHOP":
/*!**********************************************************!*\
  !*** ./src/app/component/authentication/route.guards.ts ***!
  \**********************************************************/
/*! exports provided: RoutingGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoutingGuard", function() { return RoutingGuard; });
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login/login.component */ "U5be");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.service */ "ddlN");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");






class RoutingGuard {
    constructor(authService, router, matDialog) {
        this.authService = authService;
        this.router = router;
        this.matDialog = matDialog;
    }
    canActivate(route, state) {
        const isAuth = this.authService.getIsAuth();
        if (!isAuth) {
            this.matDialog.open(_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"]);
        }
        return isAuth;
    }
}
RoutingGuard.ɵfac = function RoutingGuard_Factory(t) { return new (t || RoutingGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"])); };
RoutingGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: RoutingGuard, factory: RoutingGuard.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](RoutingGuard, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], function () { return [{ type: _auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] }]; }, null); })();


/***/ }),

/***/ "nUvK":
/*!****************************************************!*\
  !*** ./src/app/pageComponent/faq/faq.component.ts ***!
  \****************************************************/
/*! exports provided: FaqComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaqComponent", function() { return FaqComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class FaqComponent {
    constructor() { }
    ngOnInit() {
    }
}
FaqComponent.ɵfac = function FaqComponent_Factory(t) { return new (t || FaqComponent)(); };
FaqComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FaqComponent, selectors: [["app-faq"]], decls: 37, vars: 0, consts: [["id", "faq", 1, "faq"], [1, "container"], ["data-aos", "fade-up", 1, "section-title"], ["data-aos", "fade-up", "data-aos-delay", "100", 1, "row", "faq-item", "d-flex", "align-items-stretch"], [1, "col-lg-5"], [1, "ri-question-line"], [1, "col-lg-7"], ["data-aos", "fade-up", "data-aos-delay", "200", 1, "row", "faq-item", "d-flex", "align-items-stretch"], ["data-aos", "fade-up", "data-aos-delay", "300", 1, "row", "faq-item", "d-flex", "align-items-stretch"], ["data-aos", "fade-up", "data-aos-delay", "400", 1, "row", "faq-item", "d-flex", "align-items-stretch"]], template: function FaqComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Frequently Asked Questions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "i", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "How exactly will you provide guidance to aspirants of core industries?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Aspirants upon signing up will be given access to hundreds of pre-recorded video sessions of the respective sub-sectors . These sessions will range from very basic introductory to in depth tours of the sub-sectors. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "i", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Could you give an example of a video session?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " Lets take the Electrical Engineering Industry example. There will be an introductory video walking you through the various sub sectors present in the Industry followed by in depth videos of each subsectors. Topics like IIOT, MEP, Instrumentation, T&Ds, Machineries will be taught along with real life implication and animations. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "i", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "How will students/users access the videos?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, " Students will have to sign up with the portal and then based upon their subscription plan they will be given access to video sessions, QnA sessions, notes etc. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "i", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "How about certifications?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, " We will be providing both technical and non technical certifications. Non Technical like project management, production management and technical ones like MEP, BIM, CAE, Industrial Safety etc. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["section[_ngcontent-%COMP%] {\r\n    padding: 60px 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.section-bg[_ngcontent-%COMP%] {\r\n    background-color: #f7fbfe;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    padding-bottom: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    font-size: 32px;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n    position: relative;\r\n    color: #222222;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before, .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\r\n    margin: 0 15px 10px 0;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n    margin: 0 0 10px 15px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin: 15px 0 0 0;\r\n}\r\n\r\n.faq[_ngcontent-%COMP%]   .faq-item[_ngcontent-%COMP%] {\r\n    margin: 20px 0;\r\n    padding: 20px 0;\r\n    border-bottom: 1px solid #eeeeee;\r\n}\r\n\r\n.faq[_ngcontent-%COMP%]   .faq-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n    color: #8bc4ea;\r\n    font-size: 24px;\r\n    float: left;\r\n    line-height: 0;\r\n    padding: 13px 0 0 0;\r\n    margin: 0;\r\n}\r\n\r\n.faq[_ngcontent-%COMP%]   .faq-item[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\r\n    font-size: 16px;\r\n    line-height: 26px;\r\n    font-weight: 500;\r\n    margin: 0 0 10px 32px;\r\n   \r\n}\r\n\r\n.faq[_ngcontent-%COMP%]   .faq-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    font-size: 15px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9mYXEvZmFxLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLGtCQUFrQjtJQUNsQixjQUFjO0FBQ2xCOztBQUVBOztJQUVJLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBR0E7SUFDSSxjQUFjO0lBQ2QsZUFBZTtJQUNmLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLGNBQWM7SUFDZCxlQUFlO0lBQ2YsV0FBVztJQUNYLGNBQWM7SUFDZCxtQkFBbUI7SUFDbkIsU0FBUztBQUNiOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIscUJBQXFCOztBQUV6Qjs7QUFFQTtJQUNJLGVBQWU7QUFDbkIiLCJmaWxlIjoic3JjL2FwcC9wYWdlQ29tcG9uZW50L2ZhcS9mYXEuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInNlY3Rpb24ge1xyXG4gICAgcGFkZGluZzogNjBweCAwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLnNlY3Rpb24tYmcge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZmJmZTtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDMwcHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyIHtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGNvbG9yOiAjMjIyMjIyO1xyXG59XHJcblxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YmVmb3JlLFxyXG4uc2VjdGlvbi10aXRsZSBoMjo6YWZ0ZXIge1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIGhlaWdodDogMnB4O1xyXG4gICAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDI6OmJlZm9yZSB7XHJcbiAgICBtYXJnaW46IDAgMTVweCAxMHB4IDA7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjphZnRlciB7XHJcbiAgICBtYXJnaW46IDAgMCAxMHB4IDE1cHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIHAge1xyXG4gICAgbWFyZ2luOiAxNXB4IDAgMCAwO1xyXG59XHJcblxyXG5cclxuLmZhcSAuZmFxLWl0ZW0ge1xyXG4gICAgbWFyZ2luOiAyMHB4IDA7XHJcbiAgICBwYWRkaW5nOiAyMHB4IDA7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZWVlZTtcclxufVxyXG5cclxuLmZhcSAuZmFxLWl0ZW0gaSB7XHJcbiAgICBjb2xvcjogIzhiYzRlYTtcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgbGluZS1oZWlnaHQ6IDA7XHJcbiAgICBwYWRkaW5nOiAxM3B4IDAgMCAwO1xyXG4gICAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4uZmFxIC5mYXEtaXRlbSBoNCB7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBsaW5lLWhlaWdodDogMjZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBtYXJnaW46IDAgMCAxMHB4IDMycHg7XHJcbiAgIFxyXG59XHJcblxyXG4uZmFxIC5mYXEtaXRlbSBwIHtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FaqComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-faq',
                templateUrl: './faq.component.html',
                styleUrls: ['./faq.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "q+By":
/*!**********************************************************!*\
  !*** ./src/app/pageComponent/awards/awards.component.ts ***!
  \**********************************************************/
/*! exports provided: AwardsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AwardsComponent", function() { return AwardsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class AwardsComponent {
    constructor() { }
    ngOnInit() {
    }
}
AwardsComponent.ɵfac = function AwardsComponent_Factory(t) { return new (t || AwardsComponent)(); };
AwardsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AwardsComponent, selectors: [["app-awards"]], decls: 13, vars: 0, consts: [[1, "container"], ["data-aos", "fade-up", 1, "section-title"], ["data-aos", "zoom-in-up", 1, "row"], [1, "award-item", "col-lg-2", "col-md-4", "col-sm-6", "col-xs-12", "award1", "text-center"], ["src", "assets/images/award1.png", "alt", "", 1, "d-block"], [1, "award-item", "col-lg-2", "col-md-4", "col-sm-6", "col-xs-12", "award2", "text-center"], ["src", "assets/images/award2.png", "alt", "", 1, "d-block"], [1, "award-item", "col-lg-2", "col-md-4", "col-sm-6", "col-xs-12", "award3", "text-center"], ["src", "assets/images/award3.png", "alt", "", 1, "d-block"], [1, "award-item", "col-lg-2", "col-md-4", "col-sm-6", "col-xs-12", "award4", "text-center"], ["src", "assets/images/award4.png", "alt", "", 1, "img-fluid", "d-block"]], template: function AwardsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "AWARDS & RECOGNITIONS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".container[_ngcontent-%COMP%] {\r\n  margin-top: 3rem;\r\n  width: 100%;\r\n  height: auto;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  padding-bottom: 30px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  font-size: 32px;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  position: relative;\r\n  color: #222222;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before, .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n  content: '';\r\n  width: 50px;\r\n  height: 2px;\r\n  background: #f0ab18;\r\n  display: inline-block;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\r\n  margin: 0 15px 10px 0;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::after {\r\n  margin: 0 0 10px 15px;\r\n}\r\n\r\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  margin: 15px 0 0 0;\r\n}\r\n\r\n.award-item[_ngcontent-%COMP%] {\r\n  min-width: 120px;\r\n  box-sizing: content-box;\r\n  padding: 30px 30px 30px 30px;\r\n  margin: 10px 15px;\r\n  min-height: 100px;\r\n  box-shadow: 0px 2px 12px #f0ab18;\r\n  position: relative;\r\n  background: #fff;\r\n}\r\n\r\n.award-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 160px;\r\n  border-radius: 10px;\r\n  border: 6px solid #fff;\r\n  margin: auto;\r\n}\r\n\r\n.award2[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 150px;\r\n  border-radius: 10px;\r\n  border: 6px solid #fff;\r\n  position: absolute;\r\n  margin-top: 30px;\r\n  margin-left: 20px;\r\n}\r\n\r\n.award3[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 140px;\r\n  height: 100px;\r\n  border-radius: 10px;\r\n  border: 6px solid #fff;\r\n}\r\n\r\n.award4[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 150px;\r\n  border-radius: 10px;\r\n  border: 6px solid #fff;\r\n  position: absolute;\r\n  margin-top: 20px;\r\n  margin-left: 20px;\r\n\r\n}\r\n\r\n@media (max-width: 767px) {\r\n  .award-item[_ngcontent-%COMP%] {\r\n    padding-left: 0;\r\n  }\r\n\r\n  .award-item[_ngcontent-%COMP%] {\r\n    padding: 30px;\r\n    margin: 15px;\r\n  }\r\n\r\n  .award-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n    position: static;\r\n    left: auto;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9hd2FyZHMvYXdhcmRzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHlCQUF5QjtFQUN6QixrQkFBa0I7RUFDbEIsY0FBYztBQUNoQjs7QUFFQTs7RUFFRSxXQUFXO0VBQ1gsV0FBVztFQUNYLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUlBO0VBQ0UsZ0JBQWdCO0VBQ2hCLHVCQUF1QjtFQUN2Qiw0QkFBNEI7RUFDNUIsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixnQ0FBZ0M7RUFDaEMsa0JBQWtCO0VBQ2xCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixpQkFBaUI7O0FBRW5COztBQUVBO0VBQ0U7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsYUFBYTtJQUNiLFlBQVk7RUFDZDs7RUFFQTtJQUNFLGdCQUFnQjtJQUNoQixVQUFVO0VBQ1o7QUFDRiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvYXdhcmRzL2F3YXJkcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciB7XHJcbiAgbWFyZ2luLXRvcDogM3JlbTtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IGF1dG87XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgcGFkZGluZy1ib3R0b206IDMwcHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyIHtcclxuICBmb250LXNpemU6IDMycHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgY29sb3I6ICMyMjIyMjI7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjpiZWZvcmUsXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjphZnRlciB7XHJcbiAgY29udGVudDogJyc7XHJcbiAgd2lkdGg6IDUwcHg7XHJcbiAgaGVpZ2h0OiAycHg7XHJcbiAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIGgyOjpiZWZvcmUge1xyXG4gIG1hcmdpbjogMCAxNXB4IDEwcHggMDtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUgaDI6OmFmdGVyIHtcclxuICBtYXJnaW46IDAgMCAxMHB4IDE1cHg7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlIHAge1xyXG4gIG1hcmdpbjogMTVweCAwIDAgMDtcclxufVxyXG5cclxuXHJcblxyXG4uYXdhcmQtaXRlbSB7XHJcbiAgbWluLXdpZHRoOiAxMjBweDtcclxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuICBwYWRkaW5nOiAzMHB4IDMwcHggMzBweCAzMHB4O1xyXG4gIG1hcmdpbjogMTBweCAxNXB4O1xyXG4gIG1pbi1oZWlnaHQ6IDEwMHB4O1xyXG4gIGJveC1zaGFkb3c6IDBweCAycHggMTJweCAjZjBhYjE4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG59XHJcblxyXG4uYXdhcmQtaXRlbSBpbWcge1xyXG4gIHdpZHRoOiAxNjBweDtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIGJvcmRlcjogNnB4IHNvbGlkICNmZmY7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG59XHJcblxyXG4uYXdhcmQyIGltZyB7XHJcbiAgd2lkdGg6IDE1MHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgYm9yZGVyOiA2cHggc29saWQgI2ZmZjtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxuICBtYXJnaW4tbGVmdDogMjBweDtcclxufVxyXG5cclxuLmF3YXJkMyBpbWcge1xyXG4gIHdpZHRoOiAxNDBweDtcclxuICBoZWlnaHQ6IDEwMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgYm9yZGVyOiA2cHggc29saWQgI2ZmZjtcclxufVxyXG5cclxuLmF3YXJkNCBpbWcge1xyXG4gIHdpZHRoOiAxNTBweDtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIGJvcmRlcjogNnB4IHNvbGlkICNmZmY7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcblxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcclxuICAuYXdhcmQtaXRlbSB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XHJcbiAgfVxyXG5cclxuICAuYXdhcmQtaXRlbSB7XHJcbiAgICBwYWRkaW5nOiAzMHB4O1xyXG4gICAgbWFyZ2luOiAxNXB4O1xyXG4gIH1cclxuXHJcbiAgLmF3YXJkLWl0ZW0gaW1nIHtcclxuICAgIHBvc2l0aW9uOiBzdGF0aWM7XHJcbiAgICBsZWZ0OiBhdXRvO1xyXG4gIH1cclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AwardsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-awards',
                templateUrl: './awards.component.html',
                styleUrls: ['./awards.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "s9j+":
/*!******************************************************************************!*\
  !*** ./src/app/pageComponent/rating-component/rating-component.component.ts ***!
  \******************************************************************************/
/*! exports provided: RatingComponentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatingComponentComponent", function() { return RatingComponentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class RatingComponentComponent {
    constructor() { }
    ngOnInit() {
    }
}
RatingComponentComponent.ɵfac = function RatingComponentComponent_Factory(t) { return new (t || RatingComponentComponent)(); };
RatingComponentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RatingComponentComponent, selectors: [["app-rating-component"]], decls: 54, vars: 0, consts: [[1, "container-fluid"], [1, "row"], [1, "serviceDiv", "text-center"], [1, "text-dark", "text-center"], [1, "space-small", "bg-default"], [1, "container"], [1, "col-lg-3", "col-md-6", "col-sm-6", "col-xs-12"], [1, "counter-block"], [1, "counter-content"], [1, "counter-img"], [1, "counter-title"], [1, "counter-text"], [1, "counter-img1"], [1, "counter-img2"], [1, "counter-title", "align-center"], [1, "counter-text", "align-center"], [1, "counter-img3"]], template: function RatingComponentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "INDUSTRY EXPERTS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "-----text----");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "h1", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "1099");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "+");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Educare Students");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "h1", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "045");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "+");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Educare Experts");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "h1", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "10");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "+");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Certifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](46, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "h1", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "450");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "+");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Hands-On Tasks");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".counter-img[_ngcontent-%COMP%] {\r\n    width: 15rem;\r\n    height: 15rem;\r\n    background-image: url('/assets/images/student.jpg');\r\n    background-size: cover;\r\n    border-radius: 50%;\r\n    -webkit-border-radius: 50%;\r\n    -moz-border-radius: 50%;\r\n    -ms-border-radius: 50%;\r\n    -o-border-radius: 50%;\r\n}\r\n\r\n.counter-img1[_ngcontent-%COMP%] {\r\n    width: 15rem;\r\n    height: 15rem;\r\n    background-image: url('/assets/images/educareExpert.jpg');\r\n    background-size: cover;\r\n    border-radius: 50%;\r\n    -webkit-border-radius: 50%;\r\n    -moz-border-radius: 50%;\r\n    -ms-border-radius: 50%;\r\n    -o-border-radius: 50%;\r\n}\r\n\r\n.counter-img2[_ngcontent-%COMP%] {\r\n    width: 15rem;\r\n    height: 15rem;\r\n    background-image: url('/assets/images/cirtificate.jpg');\r\n    background-size: cover;\r\n    border-radius: 50%;\r\n    -webkit-border-radius: 50%;\r\n    -moz-border-radius: 50%;\r\n    -ms-border-radius: 50%;\r\n    -o-border-radius: 50%;\r\n}\r\n\r\n.counter-img3[_ngcontent-%COMP%] {\r\n    width: 15rem;\r\n    height: 15rem;\r\n    background-image: url('/assets/images/handsonExperiance.jpg');\r\n    background-size: cover;\r\n    border-radius: 50%;\r\n    -webkit-border-radius: 50%;\r\n    -moz-border-radius: 50%;\r\n    -ms-border-radius: 50%;\r\n    -o-border-radius: 50%;\r\n}\r\n\r\n.counter-title[_ngcontent-%COMP%] {\r\n    margin: 1rem 5rem;\r\n}\r\n\r\n.counter-text[_ngcontent-%COMP%] {\r\n    margin-left: 1rem;\r\n}\r\n\r\n@media (max-width:575px) {\r\n    .counter-content[_ngcontent-%COMP%] {\r\n        margin-left: 25%;\r\n    }\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    align-items: center;\r\n    margin-top: 5rem;\r\n    font-size: 32px;\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before, .serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::after {\r\n    content: '';\r\n    width: 50px;\r\n    height: 2px;\r\n    margin: 1rem;\r\n    background: #f0ab18;\r\n    display: inline-block;\r\n}\r\n\r\n.serviceDiv[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    padding: 0.3%;\r\n    font-size: 32px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9yYXRpbmctY29tcG9uZW50L3JhdGluZy1jb21wb25lbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsbURBQW1EO0lBQ25ELHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsMEJBQTBCO0lBQzFCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYix5REFBeUQ7SUFDekQsc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQiwwQkFBMEI7SUFDMUIsdUJBQXVCO0lBQ3ZCLHNCQUFzQjtJQUN0QixxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLHVEQUF1RDtJQUN2RCxzQkFBc0I7SUFDdEIsa0JBQWtCO0lBQ2xCLDBCQUEwQjtJQUMxQix1QkFBdUI7SUFDdkIsc0JBQXNCO0lBQ3RCLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsNkRBQTZEO0lBQzdELHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsMEJBQTBCO0lBQzFCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0k7UUFDSSxnQkFBZ0I7SUFDcEI7QUFDSjs7QUFDQTtJQUNJLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLGVBQWU7QUFDbkI7O0FBRUE7O0lBRUksV0FBVztJQUNYLFdBQVc7SUFDWCxXQUFXO0lBQ1gsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixlQUFlO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvcGFnZUNvbXBvbmVudC9yYXRpbmctY29tcG9uZW50L3JhdGluZy1jb21wb25lbnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb3VudGVyLWltZyB7XHJcbiAgICB3aWR0aDogMTVyZW07XHJcbiAgICBoZWlnaHQ6IDE1cmVtO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9zdHVkZW50LmpwZycpO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAtbXMtYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgLW8tYm9yZGVyLXJhZGl1czogNTAlO1xyXG59XHJcblxyXG4uY291bnRlci1pbWcxIHtcclxuICAgIHdpZHRoOiAxNXJlbTtcclxuICAgIGhlaWdodDogMTVyZW07XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzL2VkdWNhcmVFeHBlcnQuanBnJyk7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIC1tcy1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAtby1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbn1cclxuXHJcbi5jb3VudGVyLWltZzIge1xyXG4gICAgd2lkdGg6IDE1cmVtO1xyXG4gICAgaGVpZ2h0OiAxNXJlbTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvY2lydGlmaWNhdGUuanBnJyk7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIC1tcy1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAtby1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbn1cclxuXHJcbi5jb3VudGVyLWltZzMge1xyXG4gICAgd2lkdGg6IDE1cmVtO1xyXG4gICAgaGVpZ2h0OiAxNXJlbTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvaGFuZHNvbkV4cGVyaWFuY2UuanBnJyk7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIC1tcy1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAtby1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbn1cclxuXHJcbi5jb3VudGVyLXRpdGxlIHtcclxuICAgIG1hcmdpbjogMXJlbSA1cmVtO1xyXG59XHJcblxyXG4uY291bnRlci10ZXh0IHtcclxuICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDo1NzVweCkge1xyXG4gICAgLmNvdW50ZXItY29udGVudCB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDI1JTtcclxuICAgIH1cclxufVxyXG4uc2VydmljZURpdiB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiA1cmVtO1xyXG4gICAgZm9udC1zaXplOiAzMnB4O1xyXG59XHJcblxyXG4uc2VydmljZURpdiBoMTo6YmVmb3JlLFxyXG4uc2VydmljZURpdiBoMTo6YWZ0ZXIge1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIGhlaWdodDogMnB4O1xyXG4gICAgbWFyZ2luOiAxcmVtO1xyXG4gICAgYmFja2dyb3VuZDogI2YwYWIxODtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLnNlcnZpY2VEaXYgaDEge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBwYWRkaW5nOiAwLjMlO1xyXG4gICAgZm9udC1zaXplOiAzMnB4O1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RatingComponentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-rating-component',
                templateUrl: './rating-component.component.html',
                styleUrls: ['./rating-component.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "sEIG":
/*!********************************************!*\
  !*** ./src/app/util/course-detail.enum.ts ***!
  \********************************************/
/*! exports provided: showDetail_Civil, showDetail_Electrical, showDetail_Mechanical, showDetail_Chemical, showDetail_Metallurgy, showDetail_Biotech, showDetail_ECE, showDetail_Aeronautical */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showDetail_Civil", function() { return showDetail_Civil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showDetail_Electrical", function() { return showDetail_Electrical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showDetail_Mechanical", function() { return showDetail_Mechanical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showDetail_Chemical", function() { return showDetail_Chemical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showDetail_Metallurgy", function() { return showDetail_Metallurgy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showDetail_Biotech", function() { return showDetail_Biotech; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showDetail_ECE", function() { return showDetail_ECE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showDetail_Aeronautical", function() { return showDetail_Aeronautical; });
const showDetail_Civil = {
    detail: 'Civil engineering is a professional engineering discipline that deals with the design, construction, and maintenance of the physical and naturally built environment, including public works such as roads, bridges, canals, dams, airports, sewerage systems, pipelines, structural components of buildings, and railways.',
    url: '.././assets/images/civil.jpg',
    about: 'This course will provide you most required skills in civil industries',
    pointOne: ' Construction Project Management',
    pointTwo: 'Estimation and Costing',
    pointThree: 'Building Infrastructure'
};
const showDetail_Electrical = {
    detail: 'Electrical engineering is an engineering discipline concerned with the study, design and application of equipment, devices and systems which use electricity, electronics, and electromagnetism.',
    url: '.././assets/images/electrical.jpg',
    about: "Can you imagine a complete day without electricity!!! Don’t you think it is quite unrealistic to even hear this? Don’t worry; electricity is always available till the day electrical engineers are working around us. One of the very important streams of engineering, electrical engineering consists of a several number of verticals like high voltage electricity generation & transmission to low voltage electronics application like automation, IIOT etc. Electrical Engineering makes our life so much more sophisticated and it is one of the engineering fields which has more diversified verticals and shows the magic of science than it counterparts.NinthSem's CCIM is an unique e learning syllabus where learners understand and catch the practical aspects of electrical engineering which are essential for an engineer to get into a particular field/job. The most important verticals of electrical engineering are Manufacturing, Transmission and Distribution, Electrical Automation etc. From each of the verticals, there are set of video content based on well explained examples which are prepared by our respective industry experts.The CCIM is prepared in such a way that, anyone would be just curious to see further videos course once he/she starts to watch. Being an electrical engineer, you have the freedom to choose your sector/vertical depending on your interest, like some students have interest to get into power sector whereas some others have interest to get into automation sector. Our industry experts have also added real time case studies to understand better without any confusion. Apart from videos courses, live sessions are also provided to directly interact with industry experts. In short CCIM will be your one stop solution that will catapult your skills and confidence before or just after you've step into your proffessional world. And this type of learning is necessary in today's competitive world, since no one teaches fresh engineers during the ON JOB TRAINING. Aren’t you excited to become a trained professional!!! Our industry experts are excited to make you trained!!!!",
    // about: 'This course will provide you most required skills in electrical industries', 
    extraPoints: ['Industrial Internet of Things (IIoT)', 'Electrical Automation', 'Instrumentation Sector',
        'Construction/Real Estate Sector', 'Power Plant Sector', 'Operations & Maintenance Sector', 'Renewable Energy Sector', 'Electrical Designing']
};
const showDetail_Mechanical = {
    detail: 'Mechanical engineering is an engineering discipline that combines engineering physics and mathematics principles with materials science to design, analyze, manufacture, and maintain mechanical systems.',
    url: '.././assets/images/mechanical.jpg',
    about: 'Known as the evergreen sector, Mechanical Engineering forms the heart of the Core Engineering industry. Mechanical engineers design power-producing machines, such as electric generators, internal combustion engines, steam and gas turbines, as well as power-using machines, such as refrigeration, air-conditioning systems and much more. We through CCIM guide you through all the practical aspects of Mechanical Engineering. Now Mechanical engineering has a variety of sectors, namely Power Plant Sector, Automobile, Manufacturing , EPC, Oil and Gas and some more. Lets say you are interested to know or have your career carved in the Manufacturing sector, we have video content that will guide you through the various job profiles, work responsibilities in each of them, various sub sectors of the same and what all technicalities to expect in the Manufacturing sector. Our videos also will take you through the kind of technical machines that you will be working with inside your desired subsector. There are detailed videos of its operations, trouble shooting methods, old and new versions of such machines and much more. So with such content at your dispense , you will become industry ready even before stepping into one. And it will enable you to make a choice decision if or not you want to carve a career in the sub sector. We also will have product specific case studies that will again equip you with the understanding of how things work in the described field. There is another important aspect of CCIM that we missed out to mention. More often than not there is no one to guide you once you join any of the companies/factories/plants( choose one or add a suitable one) so these videos will be the crucial part of your on job trainings that will be available to you 24* 7. Our Industry Experts will also be available to clear doubts, mentor you and guide you to overcome any issues you face with regards to your career. Sounds good? I bet it sounds awesome.',
    // about: 'This course will provide you most required skills in mechanical industries',
    extraPoints: ['Power Plant Sector', 'Automobile Sector', 'Manufacturing Sector', 'Construction Sector', 'Hydaulics Sector', 'Sales & Marketing Sector']
};
const showDetail_Chemical = {
    detail: 'Chemical engineering is the branch of engineering that deals with chemical production and the manufacture of products through chemical processes. This includes designing equipment, systems and processes for refining raw materials and for mixing, compounding and processing chemicals to make valuable products.',
    url: '.././assets/images/chemical.jpg',
    about: "Chemical Engineering is an unique branch among all other core engineering branches. That is because Chemical Engineering has given a significant contribution in manufacturing of products. Starting from toothpaste in morning to mosquito liquid at night, each & every product that we use are the blessings of Chemical Engineers. This demonstrates the uniqueness of the branch.Through CCIM NinthSem guides you through the industrial aspects of chemical engineering. You will understand exactly what you're supposed to do in an Pharmaceuticals industry and what tools, machines and work you will come across in a Pharmaceuticals industry. We would take you through all the sub sectors of the Chemical Engineering industry like Pharmaceutical, Agrochemical, Paint & Dye, Polymer, Cement, Paper, FMCG, Petrochemical etc. We have Chemical Engineers with years of industrial experience from top companies in India and they have prepared sets of videos specifically designed for fresher’s and new job joinees. The video contents are highly industry specific & designed in such a way that, students can get a rich learning experience. These premium contents make students industry ready even before they step into one. Students can find interesting case studies that can boost their industrial knowledge. Our industry experts are committed to help you overcome all the upcoming challenges in your career.",
    // about: 'This course will provide you most required skills in chemical industries',
    extraPoints: [' Pharmaceutical  Sector', 'Agochemical Sector', 'FMCG Sector', 'Paint & Dye Sector', 'Pulp & Paper Sector', 'Polymer Sector', 'Industrial Safety', 'Industrial Equipment',
    ]
};
const showDetail_Metallurgy = {
    detail: 'Metallurgical engineering is the study of metals. Combining theory and practice, degree programs cover the mining, extraction, design and processing of metals, as well as how metals react to environmental changes or stress.',
    url: '.././assets/images/metallurgy.png',
    about: "Living in a world where materials are being a part of our day to day life.Metallurgical & Materials engineering is an important branch among all other branches of engineering the role of a Metallurgical engineer is to develop design & operate processes that transform Raw Materials into engineering products It is also called the Pride of engineeringThough Ninthsem guides you through the industrial aspects of a Metallurgical Engineer it will a prexposure of yours is to how an industry operates the work culture ethics you will be familiar to it.It will be taking you through all the core performing industries ferrous and non ferrous sectors we need metals to make this society functional since materials required everywhere right from the automobiles, infrastructure, medical, Electrical & Aerospace industry we need engineers to make a strong base right from your college days as a fresher these structures provides you a platform which is highly industrial oriented for new joinees and gives you a much much valuable inputs which will make you an industry person from the very starting position.  Students offered some of the most practical experiences which will be delivered by the industrial experts and offer assistance for further growth which will be helping you in guiding your career and showings an appropriate path to overcome all the obstacles.",
    // about: 'This course will provide you most required skills in metallurgy industries',
    extraPoints: [' Phase transformations and heat treatment', 'Unit processes in extractive metallurgy', 'Mechanical behavior of materials']
};
const showDetail_Biotech = {
    detail: 'Biotechnology engineering is a field of applied biology and chemical engineering principles that involves the use of living things in engineering, technology, medicine, and other useful applications.',
    url: '.././assets/images/biotech.jpeg',
    about: 'This course will provide you most required skills in biotech industries',
    pointOne: ' Construction Project Management',
    pointTwo: 'Estimation and Costing',
    pointThree: 'Building Infrastructure'
};
const showDetail_ECE = {
    detail: 'Biotechnology engineering is a field of applied biology and chemical engineering principles that involves the use of living things in engineering, technology, medicine, and other useful applications.',
    url: '.././assets/images/biotech.jpeg',
    about: 'This course will provide you most required skills in biotech industries',
    pointOne: ' Construction Project Management',
    pointTwo: 'Estimation and Costing',
    pointThree: 'Building Infrastructure'
};
const showDetail_Aeronautical = {
    detail: 'Biotechnology engineering is a field of applied biology and chemical engineering principles that involves the use of living things in engineering, technology, medicine, and other useful applications.',
    url: '.././assets/images/biotech.jpeg',
    about: 'This course will provide you most required skills in biotech industries',
    pointOne: ' Construction Project Management',
    pointTwo: 'Estimation and Costing',
    pointThree: 'Building Infrastructure'
};


/***/ }),

/***/ "sWVo":
/*!*******************************************************************************!*\
  !*** ./src/app/component/authentication/forgot-pass/forgot-pass.component.ts ***!
  \*******************************************************************************/
/*! exports provided: ForgotPassComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPassComponent", function() { return ForgotPassComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _success_msg_success_msg_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../success-msg/success-msg.component */ "8O3K");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth.service */ "ddlN");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _util_util_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../util/util.service */ "izIa");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../header/header.component */ "Pk+G");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../footer/footer.component */ "xb3B");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
















function ForgotPassComponent_mat_spinner_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-spinner");
} }
function ForgotPassComponent_mat_error_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Password Should be Min 8 characters !!! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ForgotPassComponent_mat_error_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Password Should be Min 8 characters !!! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ForgotPassComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h5", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "password is mismatch");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class ForgotPassComponent {
    constructor(authService, activatedRoute, router, matDialog, utilService) {
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.matDialog = matDialog;
        this.utilService = utilService;
        this.error = false;
        this.hide = true;
        this.id = '';
        this.passChanged = false;
        this.userIsAuthenticated = false;
    }
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            // this.isLoading = false;
            this.utilService.setLoaderStatus(false);
            const id = params.id;
            this.id = id;
        });
        this.authService.getResponseMsg();
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusListener = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => this.userIsAuthenticated = isAuthenticated);
        this.passChanged = this.authService.getChangePassword();
        this.passStatusListener = this.authService.getPassChangeStatus().subscribe(isChanged => {
            // this.isLoading = false;
            this.utilService.setLoaderStatus(false);
            this.passChanged = isChanged,
                this.matDialog.open(_success_msg_success_msg_component__WEBPACK_IMPORTED_MODULE_1__["SuccessMsgComponent"]);
            this.router.navigate(['/']);
        });
    }
    forgotPass(form) {
        if (form.value.newPassword === form.value.rePassword) {
            this.authService.forgotPassword(form.value.newPassword, this.id);
            // this.isLoading = true;
            this.utilService.setLoaderStatus(true);
        }
        else {
            this.error = true;
        }
    }
    getLoaderStatus() {
        return this.utilService.getLoaderStatus();
    }
}
ForgotPassComponent.ɵfac = function ForgotPassComponent_Factory(t) { return new (t || ForgotPassComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_util_util_service__WEBPACK_IMPORTED_MODULE_5__["UtilService"])); };
ForgotPassComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ForgotPassComponent, selectors: [["app-forgot-pass"]], decls: 33, vars: 13, consts: [[1, "container-fluid"], [1, "row"], [2, "z-index", "100"], [1, "dialogContent"], ["mat-dialog-content", "", 1, "formPage"], [2, "margin", "auto", "width", "fit-content"], [4, "ngIf"], ["src", "/assets/images/ninthsemlogo.png", "alt", "img", 1, "align-center"], [3, "submit"], ["loginForm", "ngForm"], ["appearance", "outline"], ["name", "newPassword", "ngModel", "", "type", "password", "matInput", "", "placeholder", "Please enter New Password", "required", "", "minlength", "8", 3, "type"], ["emailInput", "ngModel"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], ["type", "password", "ngModel", "", "name", "rePassword", "matInput", "", "placeholder", "Please re-enter your password", "minlength", "8", "required", "", 3, "type"], ["passInput", "ngModel"], ["type", "submit", "mat-raised-button", "", "id", "btn1", 3, "disabled"], [1, "text-danger"]], template: function ForgotPassComponent_Template(rf, ctx) { if (rf & 1) {
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ForgotPassComponent_mat_spinner_7_Template, 1, 0, "mat-spinner", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "form", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function ForgotPassComponent_Template_form_submit_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10); return ctx.forgotPass(_r1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-form-field", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "input", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ForgotPassComponent_Template_button_click_14_listener() { return ctx.hide = !ctx.hide; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, ForgotPassComponent_mat_error_17_Template, 2, 0, "mat-error", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "mat-form-field", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "input", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ForgotPassComponent_Template_button_click_23_listener() { return ctx.hide = !ctx.hide; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, ForgotPassComponent_mat_error_26_Template, 2, 0, "mat-error", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, ForgotPassComponent_div_27_Template, 3, 0, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Submit");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "ks\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "app-footer");
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](13);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.getLoaderStatus());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("type", ctx.hide ? "password" : "text");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", "Hide password")("aria-pressed", ctx.hide);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.hide ? "visibility_off" : "visibility");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r2.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("type", ctx.hide ? "password" : "text");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", "Hide password")("aria-pressed", ctx.hide);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.hide ? "visibility_off" : "visibility");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r4.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.error);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !_r1.valid);
    } }, directives: [_header_header_component__WEBPACK_IMPORTED_MODULE_6__["HeaderComponent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogContent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatFormField"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], _angular_material_input__WEBPACK_IMPORTED_MODULE_10__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["MinLengthValidator"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButton"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatSuffix"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIcon"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_13__["FooterComponent"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__["MatSpinner"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatError"]], styles: [".container-fluid[_ngcontent-%COMP%]{\r\n    width:100%;\r\n    height:80%;\r\n    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/homeninth1.jpg');\r\n   background-size: cover;\r\n   background-repeat: no-repeat;\r\n    margin: auto;\r\n  }  \r\n  .row[_ngcontent-%COMP%]{\r\n    width: 100%;\r\n    height: 100%;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n   }  \r\n  input[_ngcontent-%COMP%]{\r\n     width: 100%;\r\n   }  \r\n  button[_ngcontent-%COMP%]{\r\n   width: auto;\r\n   height: auto;\r\n   background-color: #9babab;\r\n }  \r\n  .dialogContent[_ngcontent-%COMP%]{\r\n  background-image: linear-gradient(to right,#e4eded  , #747a7a) !important;\r\n  width:auto;\r\n  padding: 10rem ;\r\n  margin-top: 3rem;\r\n  border-radius: 10px;\r\n}  \r\n  img[_ngcontent-%COMP%]{\r\n  max-height: 8rem;\r\n  max-width: 25rem;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL2ZvcmdvdC1wYXNzL2ZvcmdvdC1wYXNzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtFQUNFO0lBQ0UsVUFBVTtJQUNWLFVBQVU7SUFDViwrR0FBK0c7R0FDaEgsc0JBQXNCO0dBQ3RCLDRCQUE0QjtJQUMzQixZQUFZO0VBQ2Q7RUFDQTtJQUNFLFdBQVc7SUFDWCxZQUFZO0lBQ1osYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7R0FDcEI7RUFDQTtLQUNFLFdBQVc7R0FDYjtFQUVGO0dBQ0UsV0FBVztHQUNYLFlBQVk7R0FDWix5QkFBeUI7Q0FDM0I7RUFDQTtFQUNDLHlFQUF5RTtFQUN6RSxVQUFVO0VBQ1YsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7RUFDQztFQUNDLGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvYXV0aGVudGljYXRpb24vZm9yZ290LXBhc3MvZm9yZ290LXBhc3MuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIC5jb250YWluZXItZmx1aWR7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gICAgaGVpZ2h0OjgwJTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMC41KSksIHVybCgnL2Fzc2V0cy9pbWFnZXMvaG9tZW5pbnRoMS5qcGcnKTtcclxuICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICB9ICBcclxuICAucm93e1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICB9XHJcbiAgIGlucHV0e1xyXG4gICAgIHdpZHRoOiAxMDAlO1xyXG4gICB9XHJcbiAgIFxyXG4gYnV0dG9ue1xyXG4gICB3aWR0aDogYXV0bztcclxuICAgaGVpZ2h0OiBhdXRvO1xyXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWJhYmFiO1xyXG4gfVxyXG4gLmRpYWxvZ0NvbnRlbnR7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCNlNGVkZWQgICwgIzc0N2E3YSkgIWltcG9ydGFudDtcclxuICB3aWR0aDphdXRvO1xyXG4gIHBhZGRpbmc6IDEwcmVtIDtcclxuICBtYXJnaW4tdG9wOiAzcmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbn1cclxuIGltZ3tcclxuICBtYXgtaGVpZ2h0OiA4cmVtO1xyXG4gIG1heC13aWR0aDogMjVyZW07XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ForgotPassComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-forgot-pass',
                templateUrl: './forgot-pass.component.html',
                styleUrls: ['./forgot-pass.component.css']
            }]
    }], function () { return [{ type: _auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] }, { type: _util_util_service__WEBPACK_IMPORTED_MODULE_5__["UtilService"] }]; }, null); })();


/***/ }),

/***/ "tGXq":
/*!************************************************************!*\
  !*** ./src/app/pageComponent/video/menu/menu.component.ts ***!
  \************************************************************/
/*! exports provided: MenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuComponent", function() { return MenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class MenuComponent {
    constructor() { }
    ngOnInit() {
    }
}
MenuComponent.ɵfac = function MenuComponent_Factory(t) { return new (t || MenuComponent)(); };
MenuComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MenuComponent, selectors: [["app-menu"]], decls: 2, vars: 0, template: function MenuComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "menu works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvdmlkZW8vbWVudS9tZW51LmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MenuComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-menu',
                templateUrl: './menu.component.html',
                styleUrls: ['./menu.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "uZWA":
/*!**********************************************************!*\
  !*** ./src/app/pageComponent/slider/slider.component.ts ***!
  \**********************************************************/
/*! exports provided: SliderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderComponent", function() { return SliderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_component_authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/component/authentication/signup/signup.component */ "4eZQ");
/* harmony import */ var src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/util/page.enum */ "7yHB");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aos */ "9a8T");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/component/authentication/auth.service */ "ddlN");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");












function SliderComponent_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SliderComponent_button_9_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.signUp(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Register ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "login");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function SliderComponent_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SliderComponent_button_10_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.buyNow(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Buy now ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "send");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class SliderComponent {
    constructor(matDialog, router, authService, utilService) {
        this.matDialog = matDialog;
        this.router = router;
        this.authService = authService;
        this.utilService = utilService;
        this.userIsAuthenticated = false;
    }
    ngOnInit() {
        aos__WEBPACK_IMPORTED_MODULE_3__["init"]();
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusListener = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => this.userIsAuthenticated = isAuthenticated);
    }
    signUp() {
        this.matDialog.open(src_app_component_authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_1__["SignupComponent"]);
    }
    buyNow(courseKey) {
        this.utilService.ScrollToTop();
        this.router.navigate([src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__["Page"].PACKAGE]);
    }
}
SliderComponent.ɵfac = function SliderComponent_Factory(t) { return new (t || SliderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_7__["UtilService"])); };
SliderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SliderComponent, selectors: [["app-slider"]], decls: 12, vars: 2, consts: [[1, "container-fluid"], [1, "row"], [1, "slider"], [1, "content1"], ["data-aos", "fade-left", 1, "animate-text"], ["mat-raised-button", "", "style", "margin-bottom: 60px !important;", 3, "click", 4, "ngIf"], [1, "animate-icon"], ["mat-raised-button", "", 2, "margin-bottom", "60px !important", 3, "click"]], template: function SliderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "NinthSem");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "We are India's first and only skill based digital learning platform which provides training and guidance to engineering students and aspirants of the Core and Non-IT industries. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, SliderComponent_button_9_Template, 4, 0, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, SliderComponent_button_10_Template, 4, 0, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.userIsAuthenticated);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.userIsAuthenticated);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIcon"]], styles: ["*[_ngcontent-%COMP%] {\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n.slider[_ngcontent-%COMP%] {\r\n    width: 100vw;\r\n    height: auto;\r\n    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/homeBG2.jpg');\r\n    background-size: cover;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.content1[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 100%;\r\n    display: inline-flex;\r\n}\r\n\r\n.animate-text[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 100%;\r\n    margin-top: 10rem;\r\n}\r\n\r\n.animate-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n    \r\n    margin-left: 28%;\r\n    font-size: 48px;\r\n    font-weight: 700;\r\n    line-height: 56px;\r\n    color: #f0ab18;\r\n    font-family: \"Raleway\", sans-serif;\r\n    animation: animation 3s;\r\n    -webkit-animation: animation 3s;\r\n}\r\n\r\n.animate-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n    margin-left: 28%;\r\n    color: #fff;\r\n    margin-bottom: 116px;\r\n    font-size: 24px;\r\n    font-family: \"Raleway\", sans-serif;\r\n    animation: animation12 2s;\r\n    -webkit-animation: animation12 2s;\r\n    overflow: hidden;\r\n}\r\n\r\n.animate-text[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n    margin-left: 28%;\r\n    font-family: \"Raleway\", sans-serif;\r\n    font-size: 14px;\r\n    background: #f0ab18;\r\n    color: #fff;\r\n    border-radius: 50px;\r\n    padding: 5px 56px;\r\n    cursor: pointer;\r\n    animation: animation2 3s;\r\n    -webkit-animation: animation2 3s;\r\n}\r\n\r\n.animate-text[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\r\n    background-color: #9babab;\r\n    color: #fff;\r\n}\r\n\r\n.animate-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n    max-width: 30rem;\r\n    justify-content: center;\r\n    justify-items: center;\r\n    margin-top: 45%;\r\n}\r\n\r\n@media (min-width:750px) {\r\n    .animate-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n        max-width: 60%;\r\n    }\r\n}\r\n\r\n@-webkit-keyframes animation {\r\n    0% {\r\n        margin-left: -10%;\r\n        opacity: 0.4;\r\n    }\r\n    100% {\r\n        margin-left: 28%;\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n@keyframes animation {\r\n    0% {\r\n        margin-left: -10%;\r\n        opacity: 0.4;\r\n    }\r\n    100% {\r\n        margin-left: 28%;\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n@-webkit-keyframes animation12 {\r\n    0% {\r\n        margin-left: 55%;\r\n        opacity: 0;\r\n        overflow: hidden;\r\n    }\r\n    100% {\r\n        margin-left: 28%;\r\n        opacity: 1;\r\n        overflow: hidden;\r\n    }\r\n}\r\n\r\n@keyframes animation12 {\r\n    0% {\r\n        margin-left: 55%;\r\n        opacity: 0;\r\n        overflow: hidden;\r\n    }\r\n    100% {\r\n        margin-left: 28%;\r\n        opacity: 1;\r\n        overflow: hidden;\r\n    }\r\n}\r\n\r\n@-webkit-keyframes animation2 {\r\n    0% {\r\n        opacity: 0;\r\n    }\r\n    100% {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n@keyframes animation2 {\r\n    0% {\r\n        opacity: 0;\r\n    }\r\n    100% {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n@media only screen and (max-width:576px) {\r\n    .animate-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n        margin-left: 18%;\r\n        color: #fff;\r\n        margin-bottom: 116px;\r\n        font-size: 24px;\r\n        margin-right: 5%;\r\n        font-family: \"Raleway\", sans-serif;\r\n        animation: animation13 2s;\r\n        -webkit-animation: animation13 2s;\r\n        overflow: hidden;\r\n    }\r\n    @-webkit-keyframes animation13 {\r\n        0% {\r\n            opacity: 0;\r\n            overflow: hidden;\r\n        }\r\n        100% {\r\n            opacity: 1;\r\n            overflow: hidden;\r\n        }\r\n    }\r\n    @keyframes animation13 {\r\n        0% {\r\n            opacity: 0;\r\n            overflow: hidden;\r\n        }\r\n        100% {\r\n            opacity: 1;\r\n            overflow: hidden;\r\n        }\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZUNvbXBvbmVudC9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxTQUFTO0lBQ1QsVUFBVTtBQUNkOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWiw0R0FBNEc7SUFDNUcsc0JBQXNCO0lBQ3RCLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxrQ0FBa0M7SUFDbEMsdUJBQXVCO0lBQ3ZCLCtCQUErQjtBQUNuQzs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsb0JBQW9CO0lBQ3BCLGVBQWU7SUFDZixrQ0FBa0M7SUFDbEMseUJBQXlCO0lBQ3pCLGlDQUFpQztJQUNqQyxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsa0NBQWtDO0lBQ2xDLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLHdCQUF3QjtJQUN4QixnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsV0FBVztBQUNmOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2QixxQkFBcUI7SUFDckIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJO1FBQ0ksY0FBYztJQUNsQjtBQUNKOztBQUVBO0lBQ0k7UUFDSSxpQkFBaUI7UUFDakIsWUFBWTtJQUNoQjtJQUNBO1FBQ0ksZ0JBQWdCO1FBQ2hCLFVBQVU7SUFDZDtBQUNKOztBQVRBO0lBQ0k7UUFDSSxpQkFBaUI7UUFDakIsWUFBWTtJQUNoQjtJQUNBO1FBQ0ksZ0JBQWdCO1FBQ2hCLFVBQVU7SUFDZDtBQUNKOztBQUVBO0lBQ0k7UUFDSSxnQkFBZ0I7UUFDaEIsVUFBVTtRQUNWLGdCQUFnQjtJQUNwQjtJQUNBO1FBQ0ksZ0JBQWdCO1FBQ2hCLFVBQVU7UUFDVixnQkFBZ0I7SUFDcEI7QUFDSjs7QUFYQTtJQUNJO1FBQ0ksZ0JBQWdCO1FBQ2hCLFVBQVU7UUFDVixnQkFBZ0I7SUFDcEI7SUFDQTtRQUNJLGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsZ0JBQWdCO0lBQ3BCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFVBQVU7SUFDZDtJQUNBO1FBQ0ksVUFBVTtJQUNkO0FBQ0o7O0FBUEE7SUFDSTtRQUNJLFVBQVU7SUFDZDtJQUNBO1FBQ0ksVUFBVTtJQUNkO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGdCQUFnQjtRQUNoQixXQUFXO1FBQ1gsb0JBQW9CO1FBQ3BCLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsa0NBQWtDO1FBQ2xDLHlCQUF5QjtRQUN6QixpQ0FBaUM7UUFDakMsZ0JBQWdCO0lBQ3BCO0lBQ0E7UUFDSTtZQUNJLFVBQVU7WUFDVixnQkFBZ0I7UUFDcEI7UUFDQTtZQUNJLFVBQVU7WUFDVixnQkFBZ0I7UUFDcEI7SUFDSjtJQVRBO1FBQ0k7WUFDSSxVQUFVO1lBQ1YsZ0JBQWdCO1FBQ3BCO1FBQ0E7WUFDSSxVQUFVO1lBQ1YsZ0JBQWdCO1FBQ3BCO0lBQ0o7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VDb21wb25lbnQvc2xpZGVyL3NsaWRlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiKiB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG4uc2xpZGVyIHtcclxuICAgIHdpZHRoOiAxMDB2dztcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMC41KSksIHVybCgnL2Fzc2V0cy9pbWFnZXMvaG9tZUJHMi5qcGcnKTtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG59XHJcblxyXG4uY29udGVudDEge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxufVxyXG5cclxuLmFuaW1hdGUtdGV4dCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIG1hcmdpbi10b3A6IDEwcmVtO1xyXG59XHJcblxyXG4uYW5pbWF0ZS10ZXh0IGgxIHtcclxuICAgIC8qIG1hcmdpbi10b3A6IDE5JTsgKi9cclxuICAgIG1hcmdpbi1sZWZ0OiAyOCU7XHJcbiAgICBmb250LXNpemU6IDQ4cHg7XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgbGluZS1oZWlnaHQ6IDU2cHg7XHJcbiAgICBjb2xvcjogI2YwYWIxODtcclxuICAgIGZvbnQtZmFtaWx5OiBcIlJhbGV3YXlcIiwgc2Fucy1zZXJpZjtcclxuICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uIDNzO1xyXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGFuaW1hdGlvbiAzcztcclxufVxyXG5cclxuLmFuaW1hdGUtdGV4dCBwIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAyOCU7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIG1hcmdpbi1ib3R0b206IDExNnB4O1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IFwiUmFsZXdheVwiLCBzYW5zLXNlcmlmO1xyXG4gICAgYW5pbWF0aW9uOiBhbmltYXRpb24xMiAycztcclxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBhbmltYXRpb24xMiAycztcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5hbmltYXRlLXRleHQgYnV0dG9uIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAyOCU7XHJcbiAgICBmb250LWZhbWlseTogXCJSYWxld2F5XCIsIHNhbnMtc2VyaWY7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZjBhYjE4O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgcGFkZGluZzogNXB4IDU2cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBhbmltYXRpb246IGFuaW1hdGlvbjIgM3M7XHJcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYW5pbWF0aW9uMiAzcztcclxufVxyXG5cclxuLmFuaW1hdGUtdGV4dCBidXR0b246aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzliYWJhYjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG4uYW5pbWF0ZS1pY29uIGltZyB7XHJcbiAgICBtYXgtd2lkdGg6IDMwcmVtO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiA0NSU7XHJcbn1cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOjc1MHB4KSB7XHJcbiAgICAuYW5pbWF0ZS10ZXh0IHAge1xyXG4gICAgICAgIG1heC13aWR0aDogNjAlO1xyXG4gICAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGFuaW1hdGlvbiB7XHJcbiAgICAwJSB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC0xMCU7XHJcbiAgICAgICAgb3BhY2l0eTogMC40O1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDI4JTtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGFuaW1hdGlvbjEyIHtcclxuICAgIDAlIHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogNTUlO1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIH1cclxuICAgIDEwMCUge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyOCU7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGFuaW1hdGlvbjIge1xyXG4gICAgMCUge1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICB9XHJcbiAgICAxMDAlIHtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTc2cHgpIHtcclxuICAgIC5hbmltYXRlLXRleHQgcCB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDE4JTtcclxuICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMTZweDtcclxuICAgICAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA1JTtcclxuICAgICAgICBmb250LWZhbWlseTogXCJSYWxld2F5XCIsIHNhbnMtc2VyaWY7XHJcbiAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24xMyAycztcclxuICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogYW5pbWF0aW9uMTMgMnM7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIH1cclxuICAgIEBrZXlmcmFtZXMgYW5pbWF0aW9uMTMge1xyXG4gICAgICAgIDAlIHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgMTAwJSB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SliderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-slider',
                templateUrl: './slider.component.html',
                styleUrls: ['./slider.component.css']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }, { type: src_app_component_authentication_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] }, { type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_7__["UtilService"] }]; }, null); })();


/***/ }),

/***/ "v6DW":
/*!**************************************************!*\
  !*** ./src/app/component/authentication/enum.ts ***!
  \**************************************************/
/*! exports provided: Branch, BranchShortForm, BranchKey, SocialMediaTerms, PACKAGEDETAILS, Course */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Branch", function() { return Branch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BranchShortForm", function() { return BranchShortForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BranchKey", function() { return BranchKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialMediaTerms", function() { return SocialMediaTerms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PACKAGEDETAILS", function() { return PACKAGEDETAILS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Course", function() { return Course; });
var Branch;
(function (Branch) {
    Branch[Branch["Mechanical Engineering"] = 0] = "Mechanical Engineering";
    Branch[Branch["Electrical Engineering"] = 1] = "Electrical Engineering";
    Branch[Branch["Chemical Engineering"] = 2] = "Chemical Engineering";
    Branch[Branch["Metallurgy Engineering"] = 3] = "Metallurgy Engineering";
    // 'Civil Engineering',
    // 'Biotech Engineering',
    // 'Aeronautical Engineering',
    // 'Electronics & Communication Engineering'
})(Branch || (Branch = {}));
var BranchShortForm;
(function (BranchShortForm) {
    BranchShortForm[BranchShortForm["Mechanical"] = 0] = "Mechanical";
    BranchShortForm[BranchShortForm["Electrical"] = 1] = "Electrical";
    BranchShortForm[BranchShortForm["Chemical"] = 2] = "Chemical";
    BranchShortForm[BranchShortForm["Metallurgy"] = 3] = "Metallurgy";
    // Civil,
    // Biotech,
    // Aeronautical,
    //  ECE
})(BranchShortForm || (BranchShortForm = {}));
var BranchKey;
(function (BranchKey) {
    BranchKey["MECH"] = "Mechanical Engineering";
    BranchKey["ELECTRICAL"] = "Electrical Engineering";
    BranchKey["CHEMICAL"] = "Chemical Engineering";
    BranchKey["MET"] = "Metallurgy Engineering";
    // CIVIL = 'Civil Engineering',
    // BIO='Biotech Engineering',
    // AERO='Aeronautical Engineering',
    // ECE='Electronics & Communication Engineering'
})(BranchKey || (BranchKey = {}));
var SocialMediaTerms;
(function (SocialMediaTerms) {
    SocialMediaTerms["BLOG"] = "BLOG";
    SocialMediaTerms["FACEBOOK"] = "FACEBOOK";
    SocialMediaTerms["TWITTER"] = "TWITTER";
    SocialMediaTerms["YOUTUBE"] = "YOUTUBE";
    SocialMediaTerms["INSTAGRAM"] = "INSTAGRAM";
    SocialMediaTerms["LINKEDIN"] = "LINKEDIN";
})(SocialMediaTerms || (SocialMediaTerms = {}));
let PACKAGEDETAILS = {
    LITE: { pkgName: 'Lite', pkgAmount: 248 },
    BASIC: { pkgName: 'Basic', pkgAmount: 1998 },
    PREMIUM: { pkgName: 'Premium', pkgAmount: 4998 }
};
var Course;
(function (Course) {
    Course[Course["Diploma"] = 0] = "Diploma";
    Course[Course["Btech"] = 1] = "Btech";
})(Course || (Course = {}));


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _pageComponent_about_about_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageComponent/about/about.component */ "OGwY");
/* harmony import */ var _pageComponent_contact_contact_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pageComponent/contact/contact.component */ "8vpz");
/* harmony import */ var src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/util/page.enum */ "7yHB");
/* harmony import */ var _component_authentication_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/authentication/login/login.component */ "U5be");
/* harmony import */ var _component_authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/authentication/signup/signup.component */ "4eZQ");
/* harmony import */ var _pageComponent_video_video_player_video_player_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pageComponent/video/video-player/video-player.component */ "NyhI");
/* harmony import */ var _pageComponent_video_videos_list_videos_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pageComponent/video/videos-list/videos-list.component */ "JFQj");
/* harmony import */ var _pageComponent_course_detail_course_detail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pageComponent/course-detail/course-detail.component */ "SuRV");
/* harmony import */ var _pageComponent_report_section_report_section_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pageComponent/report-section/report-section.component */ "iv+P");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _pageComponent_home_page_home_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pageComponent/home-page/home-page.component */ "CBMx");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var _component_authentication_route_guards__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./component/authentication/route.guards */ "lHOP");
/* harmony import */ var _component_authentication_error_msg_error_msg_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./component/authentication/error-msg/error-msg.component */ "chv7");
/* harmony import */ var _component_authentication_forgot_pass_forgot_pass_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./component/authentication/forgot-pass/forgot-pass.component */ "sWVo");
/* harmony import */ var _component_authentication_payment_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./component/authentication/payment.service */ "+wL8");
/* harmony import */ var _pageComponent_package_package_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pageComponent/package/package.component */ "jcus");




















const routes = [
    { path: src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__["Page"].SIGNUP, component: _component_authentication_signup_signup_component__WEBPACK_IMPORTED_MODULE_4__["SignupComponent"] },
    { path: src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__["Page"].LOGIN, component: _component_authentication_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__["Page"].VIDEOS, component: _pageComponent_video_videos_list_videos_list_component__WEBPACK_IMPORTED_MODULE_6__["VideosListComponent"], canActivate: [_component_authentication_route_guards__WEBPACK_IMPORTED_MODULE_13__["RoutingGuard"]] },
    { path: src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__["Page"].VIDEO_PLAYER, component: _pageComponent_video_video_player_video_player_component__WEBPACK_IMPORTED_MODULE_5__["VideoPlayerComponent"], canActivate: [_component_authentication_route_guards__WEBPACK_IMPORTED_MODULE_13__["RoutingGuard"]] },
    { path: src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__["Page"].COURSE_DETAILS, component: _pageComponent_course_detail_course_detail_component__WEBPACK_IMPORTED_MODULE_7__["CourseDetailComponent"] },
    { path: 'error', component: _component_authentication_error_msg_error_msg_component__WEBPACK_IMPORTED_MODULE_14__["ErrorMsgComponent"] },
    { path: src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__["Page"].ABOUT, component: _pageComponent_about_about_component__WEBPACK_IMPORTED_MODULE_0__["AboutComponent"] },
    { path: src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__["Page"].CONTACT, component: _pageComponent_contact_contact_component__WEBPACK_IMPORTED_MODULE_1__["ContactComponent"] },
    { path: 'forgot', component: _component_authentication_forgot_pass_forgot_pass_component__WEBPACK_IMPORTED_MODULE_15__["ForgotPassComponent"] },
    { path: src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__["Page"].HOME, component: _pageComponent_home_page_home_page_component__WEBPACK_IMPORTED_MODULE_11__["HomePageComponent"] },
    { path: src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__["Page"].REPORT, component: _pageComponent_report_section_report_section_component__WEBPACK_IMPORTED_MODULE_8__["ReportSectionComponent"] },
    { path: src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_2__["Page"].PACKAGE, component: _pageComponent_package_package_component__WEBPACK_IMPORTED_MODULE_17__["PackageComponent"] },
    { path: '**', component: _pageComponent_home_page_home_page_component__WEBPACK_IMPORTED_MODULE_11__["HomePageComponent"] }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, providers: [
        src_app_util_util_service__WEBPACK_IMPORTED_MODULE_12__["UtilService"],
        _component_authentication_route_guards__WEBPACK_IMPORTED_MODULE_13__["RoutingGuard"],
        _component_authentication_payment_service__WEBPACK_IMPORTED_MODULE_16__["PaymentService"]
    ], imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"].forRoot(routes, { useHash: true })], _angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"].forRoot(routes, { useHash: true })],
                providers: [
                    src_app_util_util_service__WEBPACK_IMPORTED_MODULE_12__["UtilService"],
                    _component_authentication_route_guards__WEBPACK_IMPORTED_MODULE_13__["RoutingGuard"],
                    _component_authentication_payment_service__WEBPACK_IMPORTED_MODULE_16__["PaymentService"]
                ],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "xb3B":
/*!******************************************************!*\
  !*** ./src/app/component/footer/footer.component.ts ***!
  \******************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/util/page.enum */ "7yHB");
/* harmony import */ var src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/util/course-detail.enum */ "sEIG");
/* harmony import */ var _authentication_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../authentication/enum */ "v6DW");
/* harmony import */ var src_app_util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/util/sessionStorageHelper */ "kBAY");
/* harmony import */ var src_app_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/util/SessionStoreKey.enum */ "Ogej");
/* harmony import */ var src_app_pageComponent_company_disclaimer_disclaimer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/pageComponent/company/disclaimer/disclaimer.component */ "5XF3");
/* harmony import */ var src_app_pageComponent_company_terms_of_service_terms_of_service_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/pageComponent/company/terms-of-service/terms-of-service.component */ "fk7o");
/* harmony import */ var src_app_pageComponent_company_payment_refund_policy_payment_refund_policy_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/pageComponent/company/payment-refund-policy/payment-refund-policy.component */ "Hbat");
/* harmony import */ var src_app_pageComponent_company_privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/pageComponent/company/privacy-policy/privacy-policy.component */ "1Wpv");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_util_util_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/util/util.service */ "izIa");
/* harmony import */ var _authentication_auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../authentication/auth.service */ "ddlN");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ "ofXK");
















function FooterComponent_li_11_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_li_11_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.goToPage(ctx_r1.Page.VIDEOS); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Videos ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class FooterComponent {
    constructor(router, utilService, authService, matDialog) {
        this.router = router;
        this.utilService = utilService;
        this.authService = authService;
        this.matDialog = matDialog;
        this.userIsAuthenticated = false;
    }
    ngOnInit() {
        this.Page = src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_1__["Page"];
        this.sm = _authentication_enum__WEBPACK_IMPORTED_MODULE_3__["SocialMediaTerms"];
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusListener = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => this.userIsAuthenticated = isAuthenticated);
        this.Page = src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_1__["Page"];
    }
    openCourseDetails(courseKey) {
        src_app_util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_4__["sessionStore"].set(src_app_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_5__["SessionStoreKey"].BRANCH, courseKey);
        this.utilService.ScrollToTop();
        this.router.navigate([src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_1__["Page"].COURSE_DETAILS]);
    }
    getBranchName() {
        this.branch = src_app_util_sessionStorageHelper__WEBPACK_IMPORTED_MODULE_4__["sessionStore"].get(src_app_util_SessionStoreKey_enum__WEBPACK_IMPORTED_MODULE_5__["SessionStoreKey"].BRANCH);
        return this.branch;
    }
    getBranchDetail() {
        return src_app_util_course_detail_enum__WEBPACK_IMPORTED_MODULE_2__["showDetail_Civil"];
    }
    goToPage(pageType) {
        this.utilService.ScrollToTop();
        this.router.navigate([pageType]);
    }
    goToBlog() {
        this.utilService.ScrollToTop();
        window.open(src_app_util_page_enum__WEBPACK_IMPORTED_MODULE_1__["ExternalURLs"].BLOG, '_blank');
    }
    openSocialMedia(type) {
        return this.utilService.openSocialMedia(type);
    }
    Disclaimer() {
        this.matDialog.open(src_app_pageComponent_company_disclaimer_disclaimer_component__WEBPACK_IMPORTED_MODULE_6__["DisclaimerComponent"]);
    }
    Terms() {
        this.matDialog.open(src_app_pageComponent_company_terms_of_service_terms_of_service_component__WEBPACK_IMPORTED_MODULE_7__["TermsOfServiceComponent"]);
    }
    Privacy() {
        this.matDialog.open(src_app_pageComponent_company_privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_9__["PrivacyPolicyComponent"]);
    }
    Payment() {
        this.matDialog.open(src_app_pageComponent_company_payment_refund_policy_payment_refund_policy_component__WEBPACK_IMPORTED_MODULE_8__["PaymentRefundPolicyComponent"]);
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_util_util_service__WEBPACK_IMPORTED_MODULE_11__["UtilService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_authentication_auth_service__WEBPACK_IMPORTED_MODULE_12__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__["MatDialog"])); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 77, vars: 1, consts: [[1, "footer"], [1, "container"], [1, "row"], [1, "col-lg-3", "col-md-3", "col-sm-3", "col-xs-12"], [1, "footer-widget", 2, "text-align", "center"], [1, "footer-title"], ["title", "Home", 3, "click"], [4, "ngIf"], [3, "click"], ["title", "NinthSem Blog", 3, "click"], ["title", "About", 3, "click"], ["title", "", 3, "click"], [1, "col-lg-3", "col-md-4", "col-sm-4", "col-xs-12"], [1, "footer-widget"], [1, ""], [1, "fa", "fa-map-marker"], ["aria-hidden", "true", 1, "fa", "fa-mobile"], [1, "fa", "fa-envelope"], ["title", "Videos", 3, "click"], [1, "col-lg-3", "col-md-5", "col-sm-5", "col-xs-12"], [1, "col-lg-12", "col-md-12", "col-sm-12", "col-xs-12"], [1, "footer-line"], [1, "col-lg-8", "col-md-8", "col-sm-6", "col-xs-12"], [1, "social-links"], ["target", "_blank", 1, "twitter", 3, "click"], [1, "icofont-twitter"], ["target", "_blank", 1, "facebook", 3, "click"], [1, "icofont-facebook"], ["target", "_blank", 1, "instagram", 3, "click"], [1, "icofont-instagram"], ["target", "_blank", 1, "linkedin", 3, "click"], [1, "icofont-linkedin"], [1, "icofont-youtube"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h3", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Quick Links");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_9_listener() { return ctx.goToPage(ctx.Page.HOME); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Home ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, FooterComponent_li_11_Template, 3, 0, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_13_listener() { return ctx.openCourseDetails("Mechanical Engineering"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Courses ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_16_listener() { return ctx.goToBlog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Blog ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_19_listener() { return ctx.goToPage(ctx.Page.ABOUT); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "About ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_22_listener() { return ctx.goToPage(ctx.Page.CONTACT); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Contact");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "h3", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "24 X 7 Support");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "i", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Avyukt Edutech Pvt. Ltd. 404, Ashok Vatika, Chakeisiani, Bhubaneswar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, " +91 7303337338");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "contact@ninthsem.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "h3", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Other Links");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_45_listener() { return ctx.Disclaimer(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Disclaimer ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_48_listener() { return ctx.Terms(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Terms of Services ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_51_listener() { return ctx.Privacy(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Privacy Policy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_54_listener() { return ctx.Payment(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "Payment Terms ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "h3", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "About Ninthsem");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "NinthSem is India's first and only Digital Learning Platform, that provides training and guidance to Engineers and aspirants of the Core and Non-IT Industries. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, " \u00A9 2020 Avyukt Edutech Private Limited. All Rights Reserved. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "a", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_67_listener() { return ctx.openSocialMedia(ctx.sm.TWITTER); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](68, "i", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "a", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_69_listener() { return ctx.openSocialMedia(ctx.sm.FACEBOOK); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "i", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "a", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_71_listener() { return ctx.openSocialMedia(ctx.sm.INSTAGRAM); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](72, "i", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "a", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_73_listener() { return ctx.openSocialMedia(ctx.sm.LINKEDIN); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](74, "i", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "a", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_a_click_75_listener() { return ctx.openSocialMedia(ctx.sm.YOUTUBE); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](76, "i", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.userIsAuthenticated);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_14__["NgIf"]], styles: [".footer-widget[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n\tcursor: pointer;\r\n}\r\n.footer-widget[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{\r\n\tcolor: white;\r\n}\r\n.social-links[_ngcontent-%COMP%] {\r\n\tpadding-bottom: 20px;\r\n\tpadding-top: 10px;\r\n  }\r\n.social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n\tfont-size: 18px;\r\n\tdisplay: inline-block;\r\n\tbackground: #fff;\r\n\tcolor: #f0ab18;\r\n\tline-height: 1;\r\n\tpadding: 8px 0;\r\n\tmargin-right: 4px;\r\n\tborder-radius: 50%;\r\n\ttext-align: center;\r\n\twidth: 36px;\r\n\theight: 36px;\r\n\ttransition: 0.3s;\r\n\tborder: 1px solid #f0ab18;\r\n  }\r\n.social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\r\n\tbackground: #f0ab18;\r\n\tcolor: #fff;\r\n  }\r\na[_ngcontent-%COMP%] {\r\n\tcursor: pointer;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtDQUNDLGVBQWU7QUFDaEI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBO0NBQ0Msb0JBQW9CO0NBQ3BCLGlCQUFpQjtFQUNoQjtBQUVBO0NBQ0QsZUFBZTtDQUNmLHFCQUFxQjtDQUNyQixnQkFBZ0I7Q0FDaEIsY0FBYztDQUNkLGNBQWM7Q0FDZCxjQUFjO0NBQ2QsaUJBQWlCO0NBQ2pCLGtCQUFrQjtDQUNsQixrQkFBa0I7Q0FDbEIsV0FBVztDQUNYLFlBQVk7Q0FDWixnQkFBZ0I7Q0FDaEIseUJBQXlCO0VBQ3hCO0FBRUE7Q0FDRCxtQkFBbUI7Q0FDbkIsV0FBVztFQUNWO0FBQ0E7Q0FDRCxlQUFlO0VBQ2QiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvb3Rlci13aWRnZXQgdWwgbGkgYSB7XHJcblx0Y3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi5mb290ZXItd2lkZ2V0IHVsIGxpIGE6aG92ZXJ7XHJcblx0Y29sb3I6IHdoaXRlO1xyXG59XHJcbi5zb2NpYWwtbGlua3Mge1xyXG5cdHBhZGRpbmctYm90dG9tOiAyMHB4O1xyXG5cdHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gIH1cclxuICBcclxuICAuc29jaWFsLWxpbmtzIGEge1xyXG5cdGZvbnQtc2l6ZTogMThweDtcclxuXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcblx0YmFja2dyb3VuZDogI2ZmZjtcclxuXHRjb2xvcjogI2YwYWIxODtcclxuXHRsaW5lLWhlaWdodDogMTtcclxuXHRwYWRkaW5nOiA4cHggMDtcclxuXHRtYXJnaW4tcmlnaHQ6IDRweDtcclxuXHRib3JkZXItcmFkaXVzOiA1MCU7XHJcblx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdHdpZHRoOiAzNnB4O1xyXG5cdGhlaWdodDogMzZweDtcclxuXHR0cmFuc2l0aW9uOiAwLjNzO1xyXG5cdGJvcmRlcjogMXB4IHNvbGlkICNmMGFiMTg7XHJcbiAgfVxyXG4gIFxyXG4gIC5zb2NpYWwtbGlua3MgYTpob3ZlciB7XHJcblx0YmFja2dyb3VuZDogI2YwYWIxODtcclxuXHRjb2xvcjogI2ZmZjtcclxuICB9XHJcbiAgYSB7XHJcblx0Y3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FooterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-footer',
                templateUrl: './footer.component.html',
                styleUrls: ['./footer.component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] }, { type: src_app_util_util_service__WEBPACK_IMPORTED_MODULE_11__["UtilService"] }, { type: _authentication_auth_service__WEBPACK_IMPORTED_MODULE_12__["AuthService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__["MatDialog"] }]; }, null); })();


/***/ }),

/***/ "y1GL":
/*!***********************************************************************!*\
  !*** ./src/app/component/authentication/profile/profile.component.ts ***!
  \***********************************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth.service */ "ddlN");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");





class ProfileComponent {
    constructor(authService) {
        this.authService = authService;
        this.userid = '';
    }
    ngOnInit() {
        this.userid = this.authService.getUserId();
        // g(this.userid);
        this.username = this.authService.Username();
        this.firstname = this.authService.Firstname();
        this.lastname = this.authService.Lastname();
        this.email = this.authService.Gmail();
        this.course = this.authService.Course();
        this.branch = this.authService.userBranch();
        this.refferalCode = this.authService.RefferalCode();
        this.paymentStatus = (this.paymentStauts_From_Login() || this.paymentStauts_From_Session()) ? 'Done' : 'Pending';
    }
    paymentStauts_From_Login() {
        return this.authService.userPaymentId() && this.authService.userSignature();
    }
    paymentStauts_From_Session() {
        return sessionStorage.getItem('payment') && sessionStorage.getItem('signature');
    }
}
ProfileComponent.ɵfac = function ProfileComponent_Factory(t) { return new (t || ProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"])); };
ProfileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProfileComponent, selectors: [["app-profile"]], decls: 19, vars: 8, consts: [["src", "/assets/images/ninthsemlogo.png", "alt", "img", 1, "align-center"], ["mat-dialog-title", ""], ["mat-dialog-content", ""], ["mat-dialog-actions", ""], ["mat-button", "", "mat-dialog-close", ""]], template: function ProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", ctx.firstname, " ", ctx.lastname, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Username: ", ctx.username, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Email: ", ctx.email, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Course: ", ctx.course, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Branch: ", ctx.branch, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Payment: ", ctx.paymentStatus, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Refferal Code: ", ctx.refferalCode, "");
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogClose"]], styles: ["img[_ngcontent-%COMP%]{\r\n    max-height: 5rem;\r\n    max-width: 16rem;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2F1dGhlbnRpY2F0aW9uL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixnQkFBZ0I7RUFDbEIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvYXV0aGVudGljYXRpb24vcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1ne1xyXG4gICAgbWF4LWhlaWdodDogNXJlbTtcclxuICAgIG1heC13aWR0aDogMTZyZW07XHJcbiAgfVxyXG4gICJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProfileComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-profile',
                templateUrl: './profile.component.html',
                styleUrls: ['./profile.component.css']
            }]
    }], function () { return [{ type: _auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }]; }, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map