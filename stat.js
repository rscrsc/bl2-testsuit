(function () {
Plotly.newPlot('graph-buffer', [
    {
        y: [],
        mode: 'lines',
        name: 'Buffer Level',
        line: {color: '#622194', width: 3}
    },
], {
    title: 'Metrics',
    xaxis: {
        title: 'Chunk Index',
        showgrid: false,
        zeroline: false
    },
    yaxis: {
        title: 'Mbps',
        rangemode: 'tozero',
        showline: false,
    }
}, {responsive: true});
Plotly.newPlot('graph-rate', [
    {
        y: [],
        mode: 'lines',
        name: 'Bitrate',
        line: {color: '#B84D88', width: 3}
    }
], {
    title: 'Metrics',
    xaxis: {
        title: 'Chunk Index',
        showgrid: false,
        zeroline: false
    },
    yaxis: {
        title: 'Mbps',
        rangemode: 'tozero',
        showline: false,
    }
}, {responsive: true});

const metrics = player.getDashMetrics();

var origOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
    this.addEventListener('load', function() {
	    Plotly.extendTraces('graph-buffer', {
		y: [
		    [metrics.getCurrentBufferLevel('video')],
		]
	    }, [0]);
	    Plotly.extendTraces('graph-rate', {
		y: [
		    [player.getCurrentRepresentationForType('video').bitrateInKbit]
		]
	    }, [0]);
    });
    origOpen.apply(this, arguments);
};
var startDelay = undefined;
function startDelayCallback () {
	startDelay = Date.now() - playerInitTs;
	console.log("Start Delay (sec): " + startDelay/1000);
	player.off(dashjs.MediaPlayer.events['CAN_PLAY'],startDelayCallback);
}
player.on(dashjs.MediaPlayer.events['BUFFER_EMPTY'],(e)=>console.log(e));
player.on(dashjs.MediaPlayer.events['CAN_PLAY'],startDelayCallback);
})();
