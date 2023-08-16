var $result = $(this);
    var divId = $result.attr("id");
    var defaults = {
      // These are the defaults.
      url: "",
      inputObjId: "",
      pdfSetting: {
        thumbnailViewBtn: true,
        searchBtn: true,
        nextPreviousBtn: true,
        pageNumberTxt: true,
        totalPagesLabel: true,
        zoomBtns: true,
        scaleSelector: true,
        presantationModeBtn: true,
        openFileBtn: true,
        printBtn: true,
        downloadBtn: true,
        bookmarkBtn: true,
        secondaryToolbarBtn: true,
        firstPageBtn: true,
        lastPageBtn: true,
        pageRotateCwBtn: true,
        pageRotateCcwBtn: true,
        cursorSelectTextToolbarBtn: true,
        cursorHandToolbarBtn: true,
        setLang: "",
        setLangFilesPath: "",
      },
      docxSetting: {
        styleMap: null,
        includeEmbeddedStyleMap: true,
        includeDefaultStyleMap: true,
        convertImage: null,
        ignoreEmptyParagraphs: false,
        idPrefix: "",
        isRtl: "auto",
      },
      pptxSetting: {
        slidesScale: "", //Change Slides scale by percent
        slideMode: true /** true,false*/,
        keyBoardShortCut: false /** true,false ,condition: slideMode: true*/,
        mediaProcess: true /** true,false: if true then process video and audio files */,
        jsZipV2: false,
        slideModeConfig: {
          first: 1,
          nav: true /** true,false : show or not nav buttons*/,
          navTxtColor: "black" /** color */,
          keyBoardShortCut: true /** true,false ,condition: */,
          showSlideNum: true /** true,false */,
          showTotalSlideNum: true /** true,false */,
          autoSlide: 1 /** false or seconds , F8 to active ,keyBoardShortCut: true */,
          randomAutoSlide: false /** true,false ,autoSlide: > 1 */,
          loop: false /** true,false */,
          background: false /** false or color*/,
          transition:
            "default" /** transition type: "slid","fade","default","random" , to show transition efects :transitionTime > 0.5 */,
          transitionTime: 1 /** transition time between slides in seconds */,
        },
      },
      sheetSetting: {
        jqueryui: false,
        activeHeaderClassName: "",
        allowEmpty: true,
        autoColumnSize: true,
        autoRowSize: false,
        columns: false,
        columnSorting: true,
        contextMenu: false,
        copyable: true,
        customBorders: false,
        fixedColumnsLeft: 0,
        fixedRowsTop: 0,
        language: "en-US",
        search: false,
        selectionMode: "single",
        sortIndicator: false,
        readOnly: false,
        startRows: 1,
        startCols: 1,
        rowHeaders: true,
        colHeaders: true,
        width: false,
        height: false,
      },
      imageSetting: {
        frame: ["100%", "100%", false],
        maxZoom: "900%",
        zoomFactor: "10%",
        mouse: true,
        keyboard: true,
        toolbar: true,
        rotateToolbar: false,
      },
    };
    var settings = $.extend(true, {}, defaults, options);
    //1.get file memeType
    //2.load all js file needed to read the file
    var file = settings.url;
    var inputId = settings.inputObjId;
    var fileObj = null;
    $("#" + divId).addClass("main_officejs_container");

    if (file != "") {
      //alert(1);
      fileObj = {
        Obj: file,
        ext: file.split(".").pop().toLowerCase(),
      };
      getContent(
        fileObj,
        divId,
        settings.pdfSetting,
        settings.docxSetting,
        settings.pptxSetting,
        settings.sheetSetting,
        settings.imageSetting,
        excelData
      );
    }