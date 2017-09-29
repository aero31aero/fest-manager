casper.test.begin('Server Sanity Check', function(test) {
    casper.start('http://localhost:3010');
    casper.then(function() {
        test.assertTitle('Atmos', 'Page Title Is Set');
        casper.waitForSelector(".indent", function() {
            casper.test.pass("Indent Exists");
            this.clickLabel('Events', 'span');
        });
    });
    casper.then(function() {
        // console.log('clicked ok, new location is ' + this.getCurrentUrl());
        test.assertEqual(this.getCurrentUrl(), "http://localhost:3010/events", "Redirected to Events Page");
    });
    casper.run(function() {
        test.done();
    });
});