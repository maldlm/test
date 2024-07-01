console.log('v15');

let giftSectionIntervalId;
let deliveryInputsIntervalId;

function handleNavigation(url) {
    const parsedUrl = new URL(url);

    if (parsedUrl.pathname === '/cart/view') {        
        giftSectionIntervalId = setInterval(() => {
            const giftCardSection = document.getElementById('showGiftCard');
            if (giftCardSection) {
                giftCardSection.classList.add('show');
                clearInterval(giftSectionIntervalId);
            }
        }, 1000);

        giftReviewIntervalId = setInterval(() => {
            // const senderElm = document.getElementsByClassName('sender_name')[0];
            // const receiverElm = document.getElementsByClassName('receiver_name')[0];
            // const msgElm = document.getElementsByClassName('gift_message')[0];
            // if (senderElm && receiverElm && msgElm) {
            //     senderElm.style.setProperty('order', 3);
            //     msgElm.style.setProperty('order', 2);
            //     receiverElm.style.setProperty('order', 1);
            //     clearInterval(giftReviewIntervalId);
            // }
            const senderElm = findLabelByText('اسم مرسل الهدية');
            const receiverElm = findLabelByText('اسم مستلم الهدية');
            if (senderElm && receiverElm) {
                senderElm.innerHTML = 'اسم مستلم الهدية';
                receiverElm.innerHTML = 'اسم مرسل الهدية';
                clearInterval(giftReviewIntervalId);
            }
        }, 1000);
    } else if (parsedUrl.pathname === '/checkout/choose-address-and-shipping/consignee' || parsedUrl.pathname === '/auth/login') {
        let streetInput;
        let districtInput;

        deliveryInputsIntervalId = setInterval(() => {
            streetInput = document.getElementById('street');
            districtInput = document.getElementById('region');

            if (!streetInput) {
                streetInput = document.getElementById('inputStreet');
                districtInput = document.getElementById('inputDistrict');
            }

            if (streetInput && districtInput) {
                streetInput.parentElement.style.setProperty('display', 'none');
                districtInput.parentElement.style.setProperty('display', 'none');

                let saveBtn;
                if (parsedUrl.pathname === '/checkout/choose-address-and-shipping/consignee') {
                    saveBtn = document.getElementsByClassName('btn round primary')[0];
                }
                else if (parsedUrl.pathname === '/auth/login') {
                    saveBtn = document.getElementsByClassName('btn btn-primary btn-lg')[0];
                }

                let clicked = false;
                if (saveBtn) {
                    saveBtn.addEventListener('click', function() {
                        if (!clicked) {
                            clicked = true;
                            
                            streetInput.value = 'n/a';
                            districtInput.value = 'n/a';

                            var streetInputEvent = new Event('input', {
                                bubbles: true,
                                cancelable: true,
                            });
                            streetInput.dispatchEvent(streetInputEvent);

                            var streetInputChangeEvent = new Event('change', {
                                bubbles: true,
                                cancelable: true,
                            });
                            streetInput.dispatchEvent(streetInputChangeEvent);

                            var districtInputEvent = new Event('input', {
                                bubbles: true,
                                cancelable: true,
                            });
                            districtInput.dispatchEvent(districtInputEvent);

                            var districtInputChangeEvent = new Event('change', {
                                bubbles: true,
                                cancelable: true,
                            });
                            districtInput.dispatchEvent(districtInputChangeEvent);

                            saveBtn.click();
                        }
                    });
                }

                clearInterval(deliveryInputsIntervalId);
            }
        }, 1000);
    } else {
        if (giftSectionIntervalId) clearInterval(giftSectionIntervalId);
        if (deliveryInputsIntervalId) clearInterval(deliveryInputsIntervalId);
    }
}

// Function to find a label by its text content
function findLabelByText(text) {
    const labels = document.querySelectorAll('label');
    for (let label of labels) {
        if (label.textContent.trim() === text) {
            return label;
        }
    }
    return null; // Return null if no label is found
}

// if (window.navigation && window.navigation.addEventListener) {
//     window.navigation.addEventListener("navigate", (event) => {
//         console.log('event --> ', event);
//         if (event.destination && event.destination.url) {
//             handleNavigation(event.destination.url);
//         }
//     });
// }

(() => {
    let oldPushState = history.pushState;
    history.pushState = function pushState() {
        let ret = oldPushState.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    };

    let oldReplaceState = history.replaceState;
    history.replaceState = function replaceState() {
        let ret = oldReplaceState.apply(this, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    };

    window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'));
    });
})();

window.addEventListener('locationchange', function () {
    handleNavigation(window.location.href);
});

handleNavigation(window.location.href);
