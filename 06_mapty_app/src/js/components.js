export function renderSwimming() {
  return `
      <div class="entry__type-box entry__type-box_rows-span">
        <label for="type" class="entry__label">Type</label>
        <select name="type" id="type" class="entry__type">
          <option value="running" class="entry__option">Running</option>
          <option value="swimming" class="entry__option" selected>Swimming</option>
          <option value="cycling" class="entry__option">Cycling</option>
          <option value="custom" class="entry__option">Custom</option>
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
          required
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
          required
        />
      </div>
      <input type="submit" hidden>`;
}

export function renderRunningCycling(option) {
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
        <label for="elevation" class="entry__label">Elev. Gain</label>
        <input
          class="entry__input"
          type="number"
          name="elevation"
          id="elevation"
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
      </div>
      <input type="submit" hidden>`;
}

export function renderCustom() {
  return `
      <div class="entry__type-box">
        <label for="type" class="entry__label">Type</label>
        <select name="type" id="type" class="entry__type">
          <option value="running" class="entry__option">Running</option>
          <option value="swimming" class="entry__option">Swimming</option>
          <option value="cycling" class="entry__option">Cycling</option>
          <option value="custom" class="entry__option" selected>Custom</option>
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
          required
        />
      </div>
      <div class="entry__input-box">
        <label for="title" class="entry__label">Title</label>
        <input
          class="entry__input"
          type="text"
          name="title"
          id="title"
          placeholder="..."
          required
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
          required
        />
      </div>
      <input type="submit" hidden>`;
}

export function renderEntry(header) {
  return `
    <div class="entry entry_filled">
      <h3 class="entry__header">${header}</h3>      
    </div>`;
}

export function renderStats(icon, value, unit) {
  return `
    <p class="stats">
      <span class="stats__icon">${icon}</span
      ><span class="stats__value">${value}</span
      ><span class="stats__unit">${unit}</span>
    </p>`;
}
