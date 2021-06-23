'use strict';

const reservationBlock = document.querySelector('.js-reservation-block');

const toggleDatepick = () => {
    reservationBlock.classList.toggle('opened');
};

const initDatepicker = async () => {
    const datepickerElem = document.querySelector('.js-datepicker');
    const clearBtn = document.querySelector('.js-clear-dates');
    const reservBtn = document.querySelector('.js-reserve-dates');

    const cabinId = parseInt(datepickerElem.dataset.cabinId, 10);
    const reservedDates = JSON.parse(datepickerElem.dataset.reservations).map(item => {
        return {
            from: item.reservation_start,
            to: item.reservation_end,
        }
    });

    const datepicker = flatpickr(datepickerElem, {
        appendTo: reservationBlock,
        dateFormat: 'Y-m-d',
        mode: 'range',
        static: true,
        clickOpens: false,
        inline: true,
        disable: reservedDates,
        minDate: Date.now(),
        onReady: (selectedDates, dateStr, instance) => {
            const clearDates = () => {
                instance.clear();
            };

            const reservDates = async (event) => {
                const eventTarget = event.currentTarget;

                eventTarget.setAttribute('disabled', true);

                const formatStr = 'Y-m-d';
                const startDate = instance.formatDate(instance.selectedDates[0], formatStr);
                const endDate = instance.formatDate(instance.selectedDates[1], formatStr);

                const response = await fetch('/api/reservations', {
                    method: 'POST',
                    body: JSON.stringify({
                        reservation_start: startDate,
                        reservation_end: endDate,
                        cabin_id: cabinId,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const resData = await response.json();

                if (response.ok) {
                    reservedDates.push({
                        from: resData.reservation_start,
                        to: resData.reservation_end,
                    });

                    instance.set('disable', reservedDates);
                    alert(`You have reserved this cabin for dates from ${resData.reservation_start} to ${resData.reservation_end}.`);
                } else {
                    alert(`${response.statusText}\n${resData.message ? resData.message : ''}`);
                }
            };

            clearBtn.addEventListener('click', clearDates);
            reservBtn.addEventListener('click', reservDates);
        },
        onChange: (selectedDates, dateStr, instance) => {
            if (selectedDates.length) {
                clearBtn.removeAttribute('disabled');

                if (selectedDates.length > 1) {
                    reservBtn.removeAttribute('disabled');
                } else {
                    reservBtn.setAttribute('disabled', true);
                }
            } else {
                clearBtn.setAttribute('disabled', true);
                reservBtn.setAttribute('disabled', true);
            }
        },
    });
}

const initReservation = async () => {
    await initDatepicker();

    document.querySelector('.js-datepicker-toggle').addEventListener('click', toggleDatepick);
};

initReservation();
