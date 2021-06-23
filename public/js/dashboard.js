'use strict';

const cancelReservation = async (event) => {
    const reservationId = event.currentTarget.dataset.reservationId;

    const response = await fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('Reservation canceled!');
        document.location.reload();
    } else {
        const resData = await response.json();

        alert(`${response.statusText}\n${resData.message ? resData.message : ''}`);
    }
};

const initDashboard = () => {
    document.querySelectorAll('.js-cancel-reservation').forEach(item => item.addEventListener('click', cancelReservation));
};

initDashboard();
