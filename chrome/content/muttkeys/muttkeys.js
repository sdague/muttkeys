function goFolderTree()
{
  var folderTree = GetFolderTree();
  folderTree.focus();
}

function goSearchInput( id, elementID )
{
  var searchInput = GetSearchInput();
  var toolbar     = document.getElementById( id );
  var element     = document.getElementById( elementID );
  if ( toolbar )
  {
//    var attribValue = toolbar.getAttribute("hidden") ;
    toolbar.setAttribute("hidden", "false" );
    if ( element )
      element.setAttribute("checked","true")
  }
  searchInput.focus();
}

function goThreadTree()
{
    var threadTree = GetThreadTree();
    threadTree.focus();
}

function SpaceHitOverlay(event)
{
  var contentWindow = window.top._content;
  var rssiframe = contentWindow.document.getElementById('_mailrssiframe');
  var splitter = document.getElementById("threadpane-splitter");
  var state = splitter.getAttribute("state");

  // if we are displaying an RSS article, we really want to scroll the nested iframe
  if (rssiframe)
    contentWindow = rssiframe.contentWindow;
  if (state == "collapsed") {
    splitter.setAttribute("state", null);
    ChangeMessagePaneVisibility(IsMessagePaneCollapsed());
  }
  else if (event && event.shiftKey) {
    if (contentWindow.scrollY > 0) {
      contentWindow.scrollByPages(-1);
    }
    else {
      goDoCommand("cmd_previousMsg");
    }
  }
  else {
    // if at the end of the message, go to the next one
    if (contentWindow.scrollY < contentWindow.scrollMaxY) {
      contentWindow.scrollByPages(1);
    }
    else {
      goDoCommand("cmd_nextMsg");
    }
  }
}

function goPageMinOrMax(page)
{
  var threadTree    = GetThreadTree();
  var threadTreeObj = threadTree.treeBoxObject;
  var rowCount      = threadTree.view.rowCount - 1;

  var contentWindow = window.top._content;
  var rssiframe = contentWindow.document.getElementById('_mailrssiframe');

  // if we are displaying an RSS article, we really want to scroll the nested iframe
  if (rssiframe)
    threadTreeObj = rssiframe.threadTreeObj;
  if (page) {
    threadTreeObj.ensureRowIsVisible(rowCount);
    threadTreeObj.view.selection.select(rowCount);
  }
  else {
    threadTreeObj.ensureRowIsVisible(0);
    threadTreeObj.view.selection.select(0);
  }
}

function goPageUpDown(page)
{
  var threadTree      = GetThreadTree();
  var threadTreeObj   = threadTree.treeBoxObject;
  var pageCount       = threadTreeObj.getPageLength();
  var rowCount        = threadTree.view.rowCount - 1;
  var currentMsgIndex = threadTreeObj.view.selection.currentIndex;

  if (page) {
    if ((currentMsgIndex + pageCount) > rowCount) { newCount = rowCount; }
    else { newCount = currentMsgIndex + pageCount; }
  }
  else {
    if ((currentMsgIndex - pageCount) < 0) { newCount = 0; }
    else { newCount = currentMsgIndex - pageCount; }
  }

  threadTreeObj.ensureRowIsVisible(newCount);
  threadTreeObj.view.selection.select(newCount);
}

function goNextOrPreviousFolder(num)
{
  var folderTree = GetFolderTree();
  var rowCount   = folderTree.view.rowCount - 1;
  var currentFolderIndex = folderTree.treeBoxObject.view.selection.currentIndex;

  if      (num ==  1) {
    if (currentFolderIndex < rowCount ) { currentFolderIndex++; }
    newIndex = currentFolderIndex;
  }
  else if (num == -1) {
    if (currentFolderIndex > 0)         { currentFolderIndex--; }
    newIndex = currentFolderIndex;
  }

  folderTree.treeBoxObject.ensureRowIsVisible(newIndex);
  folderTree.treeBoxObject.view.selection.select(newIndex);
}
