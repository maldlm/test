console.log('hee this is test dlaim 7');

let giftSectionIntervalId;
let deliveryInputsIntervalId;

function handleNavigation(url) {
    const parsedUrl = new URL(url);
    console.log('Current pathname:', parsedUrl.pathname);

    if (parsedUrl.pathname === '/cart/view') {
        console.log('User is viewing the cart!');
        
        giftSectionIntervalId = setInterval(() => {
            console.log('looking for gift...');
            const giftCardSection = document.getElementById('showGiftCard');
            if (giftCardSection) {
                giftCardSection.classList.add('show');
                clearInterval(giftSectionIntervalId);
            }
        }, 1000);
    } else if (parsedUrl.pathname === '/checkout/choose-address-and-shipping/consignee') {
        let streetInput;
        let districtInput;

        deliveryInputsIntervalId = setInterval(() => {
            console.log('looking for address...');
            streetInput = document.getElementById('street');
            districtInput = document.getElementById('region');
            if (streetInput && districtInput) {
                streetInput.parentElement.style.setProperty('display', 'none');
                districtInput.parentElement.style.setProperty('display', 'none');

                const saveBtn = document.getElementsByClassName('btn round primary')[0];

                let clicked = false;
                saveBtn.addEventListener('click', function() {
                    if (clicked) return;
                    clicked = true;
                    
                    console.log('Button was clicked!');
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
                });

                clearInterval(deliveryInputsIntervalId);
            }
        }, 1000);
    } else {
        if (giftSectionIntervalId) clearInterval(giftSectionIntervalId);
        if (deliveryInputsIntervalId) clearInterval(deliveryInputsIntervalId);
    }
}

if (window.navigation && window.navigation.addEventListener) {
    window.navigation.addEventListener("navigate", (event) => {
        console.log('Location changed!', event);
        if (event.destination && event.destination.url) {
            handleNavigation(event.destination.url);
        }
    });
}

handleNavigation(window.location.href);
