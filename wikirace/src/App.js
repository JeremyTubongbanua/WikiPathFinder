function App() {
  return (
    <>
      <form>
        <div class="form-group">
          <label for="first-link">First-Link</label>
          <input type="first-link" class="form-control" id="first-link" placeholder="https://en.wikipedia.org/wiki/My_Teen_Romantic_Comedy_SNAFU_(season_1)"></input>
        </div>
        <div class="form-group">
          <label for="Second-link">Second-Link</label>
          <input type="second-link" class="form-control" id="second-link" placeholder="https://en.wikipedia.org/wiki/Disguised_Toast"></input>
        </div>
        <div class="form-group">
          <label for="depth">Depth of Clicks</label>
          <select class="form-control" id="depth">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="form-group">
          <label for="output">Wiki-Path</label>
          <p class="p-1 pb-5 border"></p>
        </div>
      </form>
      <hr></hr>
      <button type="button" class="btn btn-primary p-3" id="path-find">Path-Find</button>
    </>
  );
}

export default App;
