import $ from 'jquery';
class Search {
    // 1. Create/ Initiate our object
    constructor() {
        this.addSearchHTML();
        this.resultsDiv = $("#search-overlay__results");
        this.openButton = $(".js-search-trigger");
        this.closeButton = $(".search-overlay__close");
        this.searchOverlay = $(".search-overlay");
        this.searchField = $(".search-box");
        this.isOverlayOpen = false;
        this.isSpinnerVisible = false;
        this.previousValue;
        this.typingTimer;
        this.events();
    }

    // 2. events
    events() {
        this.openButton.on("click", this.openOverlay.bind(this));
        this.closeButton.on("click", this.closeOverlay.bind(this));
        $(document).on("keydown", this.keyPressDispatcher.bind(this));
        this.searchField.on("keyup", this.typingLogic.bind(this));
    }

    // 3. methods 

    typingLogic() {
        if (this.searchField.val() != this.previousValue) {
            clearTimeout(this.typingTimer);
            if (this.searchField.val()) {
                if (!this.isSpinnerVisible) {
                    this.resultsDiv.html('<div class="spinner-border text-dark"></div>');
                    this.isSpinnerVisible = true;
                }
                this.typingTimer = setTimeout(this.getResults.bind(this), 650);
            } else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false;
            }
        }
        this.previousValue = this.searchField.val();
    }

    getResults() {
        $.getJSON(
            mjobs_search_data.root_url +
            '/wp-json/m_jobs/v1/search?term=' +
            this.searchField.val(),
            (result) => {
                this.resultsDiv.html(`
                <h2 class="search-overlay__section-title">Jobs</h2>
                ${result.length ?
                        '<ul class="link-list min-list">' :
                        '<p>No job matches that search query.</p>'}
                    ${result.map(i => `<li>
                                            <div class="container-fluid">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-8">
                                                        <!-- Main Heading -->
                                                        <a href="${i.permalink}">${i.job_title}</a>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-4">
                                                    <!-- Location and Date -->
                                                        <div class="row row-cols-2">
                                                            <!-- Location -->
                                                            <div class="col-xs-6 col-sm-6 ">
                                                                ${i.location}
                                                            </div>
                                                            <!--Date -->
                                                            <div class="col-xs-6 col-sm-6 ">
                                                                ${i.apply_by}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>`)
                        .join('')}
                ${result.length ? '<ul>' : ''}
                `);
                this.isSpinnerVisible = false;
            });
    }

    keyPressDispatcher(e) {
        if (e.keyCode == 220 && !this.isOverlayOpen && !$("input, textarea").is(':focus')) {
            this.openOverlay();
        }
        if (e.keyCode == 27 && this.isOverlayOpen) {
            this.closeOverlay();
        }
    }

    openOverlay() {
        this.searchOverlay.addClass("search-overlay--active");
        $("body").addClass("body-no-scroll");
        this.searchField.val("");
        this.resultsDiv.html('');
        setTimeout(() => this.searchField.focus(), 301);
        this.isOverlayOpen = true;
        return false;
    }

    closeOverlay() {
        this.searchOverlay.removeClass("search-overlay--active");
        $("body").removeClass("body-no-scroll");
        this.searchField.blur();
        this.isOverlayOpen = false;
    }

    addSearchHTML() {
        $("body").append(`
        <div class="search-overlay">
            <div class="search-overlay__top">
                <div class="container">
                    <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                    <input type="text" name="search-box" class="search-box" placeholder="What are you looking for?" autofocus/>
                    <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
                </div>
            </div>
            <div class="container">
                <div id="search-overlay__results">
                </div>
            </div>
        </div>
        `);
    }
}
export default Search