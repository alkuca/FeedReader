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

        var entry;

        beforeEach(function(done) {
            loadFeed(0,function() {
                entry = $('.feed .entry-link');
                done();
            });
        });

        // tests if there is a feed created after the above functions runs
        it("loadFeed function is completed",function(done){
            expect(entry.innerText).not.toBe("");
            done();
        });
    });

    describe("New Feed Selection", function(){

        var firstFeed;
        var secondFeed;
        
            beforeEach(function(done) {
                loadFeed(0, function() {
                    firstFeed = document.querySelector('.feed').innerHTML;
                });
                loadFeed(1, function() {
                    secondFeed = document.querySelector('.feed').innerHTML;
                    done();
                });
            });

            // tests if the first feed is different from the second feed
        it("first feed is different than the second feed",function(done){
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
    });
}());
