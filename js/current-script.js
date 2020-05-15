<script type="text/javascript" class="to-run">
(function(self){
    if (self == window) {
        var script = document.querySelector('script.to-run');
        script.className = '';
        Function(script.innerHTML).call(script);
    } else {
        // Do real stuff here. self refers to current script element.
        console.log(1, self);
    }
})(this);
</script>

//Element.getElementsByTagName()
// Live NodeList collection
var scripts = document.getElementsByTagName("script")
