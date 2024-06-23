document.addEventListener('DOMContentLoaded', function() {
    var gallery = document.getElementById('gallery');

    var getVal = function(elem, style) {
        return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
    };

    var getHeight = function(item) {
        return item.querySelector('.content').getBoundingClientRect().height;
    };

    var resizeAll = function() {
        var altura = getVal(gallery, 'grid-auto-rows');
        var gap = getVal(gallery, 'grid-gap');

        gallery.querySelectorAll('.gallery-item').forEach(function(item) {
            var el = item;
            el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
        });
    };

    window.addEventListener('resize', resizeAll);

    gallery.querySelectorAll('img').forEach(function(item) {
        item.classList.add('byebye');
        if (item.complete) {
            var altura = getVal(gallery, 'grid-auto-rows');
            var gap = getVal(gallery, 'grid-gap');
            var gitem = item.parentElement.parentElement;
            gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
            item.classList.remove('byebye');
        } else {
            item.addEventListener('load', function() {
                var altura = getVal(gallery, 'grid-auto-rows');
                var gap = getVal(gallery, 'grid-gap');
                var gitem = item.parentElement.parentElement;
                gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
                item.classList.remove('byebye');
            });
        }
    });

    // Function to shuffle array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    // Shuffle the order of gallery items
    function shuffleGalleryItems() {
        var galleryItems = Array.from(gallery.querySelectorAll('.gallery-item'));
        shuffleArray(galleryItems);

        // Remove all items from gallery
        while (gallery.firstChild) {
            gallery.removeChild(gallery.firstChild);
        }

        // Append shuffled items back to gallery
        galleryItems.forEach(function(item) {
            gallery.appendChild(item);
        });

        // Resize gallery items after shuffling
        resizeAll();
    }

    // Call function to shuffle gallery items initially
    shuffleGalleryItems();
});
