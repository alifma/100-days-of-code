document.getElementById('changeColor').addEventListener('click', function() {
    document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
});
