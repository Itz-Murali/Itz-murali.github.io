var gradientColorsArray = [
    "#14182d", // deep night blue
    "#202040", // starless midnight
    "#28304d", // shadowed blue-gray
    "#284b63", // dusk teal
    "#14213d", // obsidian navy
    "#232946", // gothic blue
    "#302b63", // galaxy indigo
    "#403567", // deep space violet
    "#21233b", // blue-black
    "#25274d", // royal twilight
    "#181823", // ink black
    "#1b263b", // cold midnight
    "#1e2746", // twilight navy
    "#311d3f", // muted purple
    "#211a36", // after dark
    "#26235c", // midnight indigo
    "#251942", // moonlit lavender
    "#2d3142", // starry slate
    "#1a1a2e", // cosmic black
    "#221c35", // shadowed grape
    "#36213e", // velvet night
    "#3c2b42", // dusty plum
    "#2f2235", // nightshade
    "#393e63", // silent blue
    "#24243e", // phantom blue
    "#37325a", // faded indigo
    "#313552", // desaturated night
    "#22223b", // inkstone blue
    "#212534", // storm gray
    "#212f3c", // inky teal
    "#183153", // eclipse blue
    "#1d3557", // deep blue sky
    "#17223b", // navy midnight
    "#232b38", // shadow slate
    "#272640", // royal obsidian
    "#331e36", // smoky violet
    "#2d3648", // blue fog
    "#332940", // silent shadow
    "#242145", // witching hour
    "#22213a"  // starless blue
];


        
var gradientTransitionStep = 0;


var gradientColorIndices = [0, 1, 2, 3];


var gradientTransitionSpeed = 0.004;

function updateGradientBackground() {
    if (typeof jQuery === 'undefined') return; 

    
    var currentLeftColorIndex = gradientColorIndices[0];
    var nextLeftColorIndex = gradientColorIndices[1];
    var currentRightColorIndex = gradientColorIndices[2];
    var nextRightColorIndex = gradientColorIndices[3];

    var currentLeftColorHex = gradientColorsArray[currentLeftColorIndex];
    var nextLeftColorHex = gradientColorsArray[nextLeftColorIndex];
    var currentRightColorHex = gradientColorsArray[currentRightColorIndex];
    var nextRightColorHex = gradientColorsArray[nextRightColorIndex];

    var inverseGradientStep = 1 - gradientTransitionStep;

    function hexToRgb(hex) {
        var r = parseInt(hex.slice(1, 3), 16);
        var g = parseInt(hex.slice(3, 5), 16);
        var b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    var [rLeftStart, gLeftStart, bLeftStart] = hexToRgb(currentLeftColorHex);
    var [rLeftEnd, gLeftEnd, bLeftEnd] = hexToRgb(nextLeftColorHex);
    var [rRightStart, gRightStart, bRightStart] = hexToRgb(currentRightColorHex);
    var [rRightEnd, gRightEnd, bRightEnd] = hexToRgb(nextRightColorHex);

    var redLeft = Math.round(inverseGradientStep * rLeftStart + gradientTransitionStep * rLeftEnd);
    var greenLeft = Math.round(inverseGradientStep * gLeftStart + gradientTransitionStep * gLeftEnd);
    var blueLeft = Math.round(inverseGradientStep * bLeftStart + gradientTransitionStep * bLeftEnd);
    var leftGradientColor = "rgb(" + redLeft + "," + greenLeft + "," + blueLeft + ")";

    var redRight = Math.round(inverseGradientStep * rRightStart + gradientTransitionStep * rRightEnd);
    var greenRight = Math.round(inverseGradientStep * gRightStart + gradientTransitionStep * gRightEnd);
    var blueRight = Math.round(inverseGradientStep * bRightStart + gradientTransitionStep * bRightEnd);
    var rightGradientColor = "rgb(" + redRight + "," + greenRight + "," + blueRight + ")";

    
    $('#gradient').css({
        background: "-webkit-gradient(linear, left top, right top, from(" + leftGradientColor + "), to(" + rightGradientColor + "))"
    }).css({
        background: "-moz-linear-gradient(left, " + leftGradientColor + " 0%, " + rightGradientColor + " 100%)"
    });

    gradientTransitionStep += gradientTransitionSpeed;
    if (gradientTransitionStep >= 1) {
        gradientTransitionStep %= 1;
        gradientColorIndices[0] = gradientColorIndices[1];
        gradientColorIndices[2] = gradientColorIndices[3];

        gradientColorIndices[1] = (gradientColorIndices[1] + Math.floor(1 + Math.random() * (gradientColorsArray.length - 1))) % gradientColorsArray.length;
        gradientColorIndices[3] = (gradientColorIndices[3] + Math.floor(1 + Math.random() * (gradientColorsArray.length - 1))) % gradientColorsArray.length;
    }
}


setInterval(updateGradientBackground, 20); // It Means 10 milliseconds 

