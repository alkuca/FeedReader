$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // tests if the URL property is defined and empty
        it("URL's are defined and not empty", function () {
            allFeeds.forEach(function(obj) {
                expect(obj.url).toBeDefined();
                expect(obj.url).not.toBe("");
            });
        });

        // tests if the names property is defined and empty
        it("names are defined and not empty", function () {
           allFeeds.forEach(function (obj) {
               expect(obj.name).toBeDefined();
               expect(obj.name).not.toBe("");
            });
        });
    });

    describe("The Menu", function() {
        // tests if the menu element is hidden by default
        it("menu is hidden by default", function () {
           expect(document.querySelector("body").classList.contains("menu-hidden")).toBe(true);
        });

        // tests if the menu element shows and hides when the hamburger icon is clicked
        it("shows and hiddes when icon is clicked", function () {
            const menuIcon = document.querySelector(".menu-icon-link");
            menuIcon.click();
            expect(document.querySelector("body").classList.contains("menu-hidden")).toBe(false);
            menuIcon.click();
            expect(document.querySelector("body").classList.contains("menu-hidden")).toBe(true);
        });

    });

    describe("Initial Entries", function(){
        beforeEach(function(done) {
            loadFeed(0,function() {
               done();
            });
        });

        // tests if there is a feed created after the above functions runs
        it("loadFeed function is completed",function(done){
            const entry = document.querySelector(".entry");
            expect(entry.innerText).not.toBe("");
            done();
        });
    });

    describe("New Feed Selection", function(){

        var firstFeed;
        var secondFeed;

        // the first function which creates the first feed and saves it in the firstFeed variable
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = document.querySelector(".feed").innerText;
                done();
            });
        });

        it("first feed is different than the second feed",function(done){
            // the second function which creates the second feed and saves it in the secondFeed variable
            loadFeed(1,function() {
                secondFeed = document.querySelector(".feed").innerText;
                done();
            });
            //tests if the first and second feed are different
            expect(firstFeed).not.toEqual(secondFeed);
        });
    });
}());
