export function renderSwimming() {
  return `
      <div class="entry__type-box entry__type-box_rows-span">
        <label for="type" class="entry__label">Type</label>
        <select name="type" id="type" class="entry__type">
          <option value="running" class="entry__option">Running</option>
          <option value="swimming" class="entry__option" selected>Swimming</option>
          <option value="cycling" class="entry__option">Cycling</option>
          <option value="custom" class="entry__option">Custom</option>
          <option value="set" class="entry__option">Set</option>
        </select>
      </div>
      <div class="entry__input-box">
        <label for="distance" class="entry__label">Distance</label>
        <input
          class="entry__input"
          type="number"
          name="distance"
          id="distance"
          placeholder="km"
        />
      </div>
      <div class="entry__input-box">
        <label for="duration" class="entry__label">Duration</label>
        <input
          class="entry__input"
          type="number"
          name="duration"
          id="duration"
          placeholder="min"
        />
      </div>`;
}

export function renderRunCycling(option) {
  return `
      <div class="entry__type-box">
        <label for="type" class="entry__label">Type</label>
        <select name="type" id="type" class="entry__type">
          <option value="running" class="entry__option" ${
            option === 'running' ? 'selected' : ''
          }>Running</option>
          <option value="swimming" class="entry__option">Swimming</option>
          <option value="cycling" class="entry__option" ${
            option === 'cycling' ? 'selected' : ''
          }>Cycling</option>
          <option value="custom" class="entry__option">Custom</option>
          <option value="set" class="entry__option">Set</option>
        </select>
      </div>
      <div class="entry__input-box">
        <label for="distance" class="entry__label">Distance</label>
        <input
          class="entry__input"
          type="number"
          name="distance"
          id="distance"
          placeholder="km"
        />
      </div>
      <div class="entry__input-box">
        <label for="gain" class="entry__label">Elev. Gain</label>
        <input
          class="entry__input"
          type="number"
          name="gain"
          id="gain"
          placeholder="meters"
        />
      </div>
      <div class="entry__input-box">
        <label for="duration" class="entry__label">Duration</label>
        <input
          class="entry__input"
          type="number"
          name="duration"
          id="duration"
          placeholder="min"
        />
      </div>`;
}

export function renderCustom() {
  return `
      <div class="entry__type-box entry__type-box_rows-span">
        <label for="type" class="entry__label">Type</label>
        <select name="type" id="type" class="entry__type">
          <option value="running" class="entry__option">Running</option>
          <option value="swimming" class="entry__option">Swimming</option>
          <option value="cycling" class="entry__option">Cycling</option>
          <option value="custom" class="entry__option" selected>Custom</option>
          <option value="set" class="entry__option">Set</option>
        </select>
      </div>
      <div class="entry__input-box">
        <label for="count" class="entry__label">Count</label>
        <input
          class="entry__input"
          type="number"
          name="count"
          id="count"
          placeholder="times"
        />
      </div>
      <div class="entry__input-box">
        <label for="duration" class="entry__label">Duration</label>
        <input
          class="entry__input"
          type="number"
          name="duration"
          id="duration"
          placeholder="min"
        />
      </div>`;
}
