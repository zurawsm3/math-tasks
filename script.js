function convert() {
  //
  //  Get the TeX input
  //
  var input = document.getElementById("input").value.trim();
  //
  //  Disable the display and render buttons until MathJax is done
  //
  var display = document.getElementById("display");
  display.disabled = true;
  //
  //  Clear the old output
  //
  output = document.getElementById('output');
  output.innerHTML = '';
  //
  //  Reset the tex labels (and automatic equation numbers, though there aren't any here).
  //  Get the conversion options (metrics and display settings)
  //  Convert the input to SVG output and use a promise to wait for it to be ready
  //    (in case an extension needs to be loaded dynamically).
  //
  MathJax.texReset();
  var options = MathJax.getMetricsFor(output);
  options.display = display.checked;
  // console.log(options);
  console.log(MathJax, "MATHJAX");
  MathJax.tex2svgPromise(input, options).then(function (node) {
    //
    //  The promise returns the typeset node, which we add to the output
    //  Then update the document to include the adjusted CSS for the
    //    content of the new equation.
    //
    output.appendChild(node);
    MathJax.startup.document.clear();
    MathJax.startup.document.updateDocument();
  }).catch(function (err) {
    //
    //  If there was an error, put the message into the output instead
    //
    output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
  }).then(function () {
    //
    //  Error or not, re-enable the display button
    //
    display.disabled = false;
  });
}
