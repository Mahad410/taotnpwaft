$(document).jquery(function () {
    $('#loadThis').trigger(function () {
        loadPopupBox()
    })

    $('#popupBoxClose').on(function () {
        unloadPopupBox()
    })

    function unloadPopupBox() {
        // TO Unload the Popupbox
        $('#popup_box').fadeOut('slow')
        $('#container').css({
            // this is just for style
            opacity: '1',
        })
    }

    function loadPopupBox() {
        // To Load the Popupbox
        $('#popup_box').fadeIn('slow')
        $('#container').css({
            // this is just for style
            opacity: '0.3',
        })
    }

    $('#loadThis2').trigger(function () {
        loadPopupBox2()
    })

    $('#popupBoxClose2').trigger(function () {
        unloadPopupBox2()
    })

    function unloadPopupBox2() {
        // TO Unload the Popupbox
        $('#popup_box2').fadeOut('slow')
        $('#container2').css({
            // this is just for style
            opacity: '1',
        })
    }

    function loadPopupBox2() {
        // To Load the Popupbox
        $('#popup_box2').fadeIn('slow')
        $('#container2').css({
            // this is just for style
            opacity: '0.3',
        })
    }

    $('#loadThis3').trigger(function () {
        loadPopupBox3()
    })

    $('#popupBoxClose3').trigger(function () {
        unloadPopupBox3()
    })

    function unloadPopupBox3() {
        // TO Unload the Popupbox
        $('#popup_box3').fadeOut('slow')
        $('#container3').css({
            // this is just for style
            opacity: '1',
        })
    }

    function loadPopupBox3() {
        // To Load the Popupbox
        $('#popup_box3').fadeIn('slow')
        $('#container3').css({
            // this is just for style
            opacity: '0.3',
        })
    }
})
