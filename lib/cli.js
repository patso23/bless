// Generated by CoffeeScript 1.7.1
(function() {
  var colors, fs, importer, input, output, parser, path, pjson, program, reporter, suffix;

  colors = require("colors");

  fs = require("fs");

  path = require("path");

  pjson = require("../package.json");

  program = require("commander");

  importer = require("../lib/importer");

  parser = require("../lib/parser");

  reporter = require("../lib/reporter");

  program.version(pjson.version).usage("<input file> [<output file>] [options]").option("-f, --force", "modify the input file provided".yellow).option("-s, --suffix", "applied to files that are imported. defaults to -blessed".yellow).parse(process.argv);

  input = program.args[0];

  if (!input) {
    console.log("blessc: no input provided".red);
    process.exit(1);
  }

  if (input !== "-" && !/\.css$/.test(input)) {
    console.log("blessc: input file is not a .css file".red);
    process.exit(1);
  }

  output = program.args[1];

  if (output == null) {
    output = input;
  }

  if (output === "-") {
    console.log("blessc: no output file provided".red);
    process.exit(1);
  }

  if (output === input && !program.force) {
    console.log("blessc: use --force or -f to modify the input file".red);
    process.exit(1);
  }

  suffix = program.suffix;

  if (suffix == null) {
    suffix = "blessed";
  }

  fs.readFile(input, "utf8", function(err, data) {
    var dirname, extension, fileData, filename, importStatements, index, indexedSuffix, newFilename, numFiles, numFilesWritten, numSelectors, printReport, result, _i, _len, _ref, _results;
    if (err) {
      throw err;
    }
    result = parser(data);
    numFiles = result.data.length;
    numSelectors = result.numSelectors;
    dirname = path.dirname(output);
    extension = path.extname(output);
    filename = path.basename(output, extension);
    numFilesWritten = 0;
    printReport = function() {
      var report;
      report = reporter({
        numSelectors: numSelectors,
        numFiles: numFiles
      });
      return console.log(report.green.bold);
    };
    if (numFiles <= 1) {
      return printReport();
    } else {
      _ref = result.data;
      _results = [];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        fileData = _ref[index];
        if (index === 0) {
          importStatements = importer({
            numFiles: result.data.length,
            output: output,
            suffix: suffix
          });
          fileData = "" + importStatements + "\n\n" + fileData;
          indexedSuffix = "";
        } else {
          indexedSuffix = "-" + suffix + "-" + index;
        }
        newFilename = "" + (path.join(dirname, filename)) + indexedSuffix + extension;
        _results.push((function(newFilename) {
          return fs.writeFile(newFilename, "" + fileData + "\n", function(err) {
            if (err) {
              throw err;
            }
            numFilesWritten++;
            if (numFilesWritten === numFiles) {
              return printReport();
            }
          });
        })(newFilename));
      }
      return _results;
    }
  });

}).call(this);