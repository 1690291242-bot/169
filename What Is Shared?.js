// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: reply;
// share-sheet-inputs: file-url, url, plain-text, image;
// Presents a table showing everthing that was passed to the script when running from a Share Sheet.
await presentMainTable()

async function presentMainTable() {
  let plainTextTitle = getPlainTextTitle()
  let imageTitle = getImageTitle()
  let urlTitle = getURLTitle()
  let fileURLTitle = getFileURLTitle()
  let table = new UITable()
  table.showSeparators = true
  let plainTextRow = new UITableRow()
  let imageRow = new UITableRow()
  let urlRow = new UITableRow()
  let fileURLRow = new UITableRow()
  plainTextRow.addText(plainTextTitle)
  imageRow.addText(imageTitle)
  urlRow.addText(urlTitle)
  fileURLRow.addText(fileURLTitle)
  table.addRow(plainTextRow)
  table.addRow(imageRow)
  table.addRow(urlRow)
  table.addRow(fileURLRow)
  if (args.plainTexts.length > 0) {
    plainTextRow.onSelect = (idx) => {
      presentPlainTexts()
    }
  }
  if (args.images.length > 0) {
    imageRow.onSelect = (idx) => {
      presentImages()
    }
  }
  if (args.urls.length > 0) {
    urlRow.onSelect = (idx) => {
      presentURLs()
    }
  }
  if (args.fileURLs.length > 0) {
    fileURLRow.onSelect = (idx) => {
      presentFileURLs()
    }
  }
  await table.present()
}

function presentPlainTexts() {
  let table = new UITable()
  for (plainText of args.plainTexts) {
    let row = new UITableRow()
    row.addText(plainText)
    addShareHandler(row, plainText)
    table.addRow(row)
  }
  addBackButton(table)
  table.present()
}

function presentImages() {
  let table = new UITable()
  for (image of args.images) {
    let row = new UITableRow()
    row.height = 100
    let imageCell = row.addImage(image)
    imageCell.centerAligned()
    addShareHandler(row, image)
    table.addRow(row)
  }
  addBackButton(table)
  table.present()
}

function presentURLs() {
  let table = new UITable()
  for (url of args.urls) {
    let row = new UITableRow()
    row.addText(url)
    addShareHandler(row, url)
    table.addRow(row)
  }
  addBackButton(table)
  table.present()
}

function presentFileURLs() {
  let table = new UITable()
  for (fileURL of args.fileURLs) {
    let row = new UITableRow()
    row.addText(fileURL)
    addShareHandler(row, fileURL)
    table.addRow(row)
  }
  addBackButton(table)
  table.present()
}

function addBackButton(table) {
  let row = new UITableRow()
  row.addText("⬅️ Back")
  table.addRow(row)
  row.onSelect = (idx) => {
    presentMainTable()
  }
}

function addShareHandler(row, item) {
  row.onSelect = (idx) => {
    share(item)
  }
}

function share(item) {
  ShareSheet.present([item])
}

function getPlainTextTitle() {
  let items = args.plainTexts
  if (items.length == 1) {
    return "1 plain text"
  } else {
    return items.length + " plain texts"
  }
}

function getImageTitle() {
  let items = args.images
  if (items.length == 1) {
    return "1 image"
  } else {
    return items.length + " images"
  }
}

function getURLTitle() {
  let items = args.urls
  if (items.length == 1) {
    return "1 URL"
  } else {
    return items.length + " URLs"
  }
}

function getFileURLTitle() {
  let items = args.fileURLs
  if (items.length == 1) {
    return "1 file URL"
  } else {
    return items.length + " file URLs"
  }
}