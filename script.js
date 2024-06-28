
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Variables to store impact statistics
    var efficiency = 0;
    var airQuality = 0;
    var trafficReduction = 0;
    var currentMode = null;

    // Update statistics based on selected options
    function updateStatistics() {
        document.getElementById('efficiency').textContent = 'Efficiency: ' + efficiency + '%';
        document.getElementById('air-quality').textContent = 'Air Quality: ' + airQuality + '%';
        document.getElementById('traffic').textContent = 'Traffic Reduction: ' + trafficReduction + '%';
    }

    // Function to select the infrastructure mode
    window.selectMode = function(mode) {
        currentMode = mode;
        map.on('click', onMapClick);
    }

    // Function to add infrastructure on map click
    function onMapClick(e) {
        var color;
        var popupText;
        
        if (currentMode === 'solar') {
            efficiency += 10;
            color = 'yellow';
            popupText = 'Solar Panels';
        } else if (currentMode === 'transport') {
            trafficReduction += 15;
            color = 'blue';
            popupText = 'Autonomous Transport';
        } else if (currentMode === 'iot') {
            airQuality += 20;
            color = 'green';
            popupText = 'IoT Sensors';
        }

        if (currentMode) {
            L.circle(e.latlng, { color: color, radius: 200 }).addTo(map)
                .bindPopup(popupText)
                .openPopup();
            currentMode = null;
            map.off('click', onMapClick);
            updateStatistics();
        }
    }

    // Function to reset the map and statistics
    window.resetMap = function() {
        map.eachLayer(function (layer) {
            if (!!layer.toGeoJSON) {
                map.removeLayer(layer);
            }
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        efficiency = 0;
        airQuality = 0;
        trafficReduction = 0;
        updateStatistics();
    };
});
