"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var vendors = {};
var cookieArray = [];
var modal = document.getElementById('modal');
var overlay = document.getElementById('overlay');
var fetchItems = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (getCookie('vendor')) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fetch('https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json', {
                        method: 'GET',
                    })];
            case 1:
                data = _a.sent();
                return [4 /*yield*/, data.json()];
            case 2:
                items = _a.sent();
                vendors = items.vendors;
                if (items) {
                    openModal();
                }
                return [2 /*return*/];
        }
    });
}); };
function getCookie(name) {
    var _a;
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2)
        return (_a = parts.pop()) === null || _a === void 0 ? void 0 : _a.split(';').shift();
}
function checkboxHandler(e) {
    var target = e.target;
    handleCheckBox(target);
}
function handleCheckBox(target) {
    if (target.checked) {
        if (!cookieArray.includes(parseInt(target.id))) {
            cookieArray.push(parseInt(target.id));
        }
    }
    else {
        for (var i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i] === parseInt(target.id)) {
                cookieArray.splice(i, 1);
                i--;
            }
        }
    }
}
function createCookie(name, value) {
    var now = new Date();
    var date = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toUTCString();
    var cookieData = JSON.stringify(value);
    document.cookie = name + '=' + cookieData + ';expires=' + date + ';path=/';
}
function appendSingleVendor(targetDiv, vendor) {
    var vendorName = vendor.name, vendorId = vendor.id, vendorUrl = vendor.policyUrl;
    var div = document.createElement('div');
    div.id = vendorId;
    div.classList.add('vendor');
    targetDiv.appendChild(div);
    var input = document.createElement('input');
    var p = document.createElement('p');
    var a = document.createElement('a');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', vendorId);
    var textnode = document.createTextNode(vendorName);
    p.appendChild(textnode);
    var linknode = document.createTextNode(vendorUrl);
    a.appendChild(linknode);
    a.title = vendorUrl;
    a.href = vendorUrl;
    div.appendChild(p);
    div.appendChild(a);
    div.appendChild(input);
}
function openModal() {
    var modalBody = document.getElementById('modal-body');
    modal === null || modal === void 0 ? void 0 : modal.classList.add('active');
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.add('active');
    for (var index in vendors) {
        appendSingleVendor(modalBody, vendors[index]);
    }
    modalBody === null || modalBody === void 0 ? void 0 : modalBody.addEventListener('click', function (e) {
        checkboxHandler(e);
    });
    var acceptButton = document.createElement('button');
    acceptButton.innerHTML = 'ACCEPT';
    acceptButton.onclick = function () {
        if (cookieArray.length) {
            createCookie('vendor', { accepted: true, vendors: cookieArray });
            closeModal();
        }
    };
    modalBody === null || modalBody === void 0 ? void 0 : modalBody.appendChild(acceptButton);
    var rejectButton = document.createElement('button');
    rejectButton.innerHTML = 'REJECT';
    rejectButton.onclick = function () {
        createCookie('vendor', { accepted: false });
        closeModal();
    };
    modalBody === null || modalBody === void 0 ? void 0 : modalBody.appendChild(rejectButton);
    var selectAllCheckboxes = document.createElement('button');
    selectAllCheckboxes.innerHTML = 'SELECT ALL';
    selectAllCheckboxes.onclick = function () {
        var checkboxes = document.querySelectorAll('.vendor input');
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            handleCheckBox(checkboxes[i]);
        }
    };
    modalBody === null || modalBody === void 0 ? void 0 : modalBody.appendChild(selectAllCheckboxes);
}
function closeModal() {
    modal === null || modal === void 0 ? void 0 : modal.classList.remove('active');
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.remove('active');
}
fetchItems();
//# sourceMappingURL=script.js.map