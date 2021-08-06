export function renderSwimming() {
  return `
      <div class="entry__type-box entry__type-box_rows-span">
        <label class="entry__label">Type</label>
        <select name="type" id="type" class="entry__type">
          <option value="running" class="entry__option">Running</option>
          <option value="swimming" class="entry__option" selected>Swimming</option>
          <option value="cycling" class="entry__option">Cycling</option>
          <option value="custom" class="entry__option">Custom</option>
        </select>
      </div>
      <div class="entry__input-box">
        <label class="entry__label">Duration</label>
        <input
          class="entry__input"
          type="number"
          name="duration"
          id="duration"
          placeholder="min"
          enterkeyhint="next"
          required
        />
      </div>
      <div class="entry__input-box">
        <label class="entry__label">Distance</label>
        <input
          class="entry__input"
          type="number"
          step="0.01"
          name="distance"
          id="distance"
          placeholder="km"
          enterkeyhint="send"
          required
        />
      </div>
      <button type="submit" hidden></button>`;
}

export function renderRunning() {
  return `
      <div class="entry__type-box">
        <label class="entry__label">Type</label>
        <select name="type" id="type" class="entry__type">
          <option value="running" class="entry__option" selected>Running</option>
          <option value="swimming" class="entry__option">Swimming</option>
          <option value="cycling" class="entry__option">Cycling</option>
          <option value="custom" class="entry__option">Custom</option>
        </select>
      </div>
      <div class="entry__input-box">
        <label class="entry__label">Duration</label>
        <input
          class="entry__input"
          type="number"
          name="duration"
          id="duration"
          placeholder="min"
          enterkeyhint="next"
          required
        />
      </div>
      <div class="entry__input-box">
        <label class="entry__label">Cadence</label>
        <input
          class="entry__input"
          type="number"
          step="0.01"
          name="cadence"
          id="cadence"
          placeholder="steps"
          enterkeyhint="next"
          required
        />
      </div>
      <div class="entry__input-box">
      <label class="entry__label">Distance</label>
      <input
        class="entry__input"
        type="number"
        step="0.01"
        name="distance"
        id="distance"
        placeholder="km"
        enterkeyhint="send"
        required
      />
    </div>
      
      <button type="submit" hidden></button>`;
}

export function renderCycling() {
  return `
      <div class="entry__type-box">
        <label class="entry__label">Type</label>
        <select name="type" id="type" class="entry__type">
          <option value="running" class="entry__option">Running</option>
          <option value="swimming" class="entry__option">Swimming</option>
          <option value="cycling" class="entry__option" selected>Cycling</option>
          <option value="custom" class="entry__option">Custom</option>
        </select>
      </div>
      <div class="entry__input-box">
        <label class="entry__label">Duration</label>
        <input
          class="entry__input"
          type="number"
          name="duration"
          id="duration"
          placeholder="min"
          enterkeyhint="next"
          required
        />
      </div>
      </div>
      <div class="entry__input-box">
        <label class="entry__label">Elev. Gain</label>
        <input
          class="entry__input"
          type="number"
          step="0.01"
          name="elevation"
          id="elevation"
          placeholder="meters"
          enterkeyhint="next"
          required
        />
      </div>
      <div class="entry__input-box">
        <label class="entry__label">Distance</label>
        <input
          class="entry__input"
          type="number"
          step="0.01"
          name="distance"
          id="distance"
          placeholder="km"
          enterkeyhint="send"
          required
        />
      <button type="submit" hidden></button>`;
}

export function renderCustom() {
  return `
      <div class="entry__type-box">
        <label class="entry__label">Type</label>
        <select name="type" id="type" class="entry__type">
          <option value="running" class="entry__option">Running</option>
          <option value="swimming" class="entry__option">Swimming</option>
          <option value="cycling" class="entry__option">Cycling</option>
          <option value="custom" class="entry__option" selected>Custom</option>
        </select>
      </div>
      <div class="entry__input-box">
      <label class="entry__label">Duration</label>
      <input
        class="entry__input"
        type="number"
        name="duration"
        id="duration"
        placeholder="min"
        enterkeyhint="next"
        required
      />
      </div>
      <div class="entry__input-box">
        <label class="entry__label">Title</label>
        <input
          class="entry__input"
          type="text"
          name="title"
          id="title"
          title="dick"
          placeholder="workout"
          enterkeyhint="next"
          required
        />
      </div>
      <div class="entry__input-box">
        <label class="entry__label">Count</label>
        <input
          class="entry__input"
          type="number"
          step="0.01"
          name="count"
          id="count"
          placeholder="times"
          enterkeyhint="send"
          required
        />
      </div>
      <button type="submit" hidden></button>`;
}

export function renderHeader(title, date) {
  return `<h3 class="entry__header">${title} on ${date}</h3>`;
}

export function renderStats(icon, value, unit) {
  return `
    <p class="stats">
      <span class="stats__icon">${icon}</span
      ><span class="stats__value">${value}</span
      ><span class="stats__unit">${unit}</span>
    </p>`;
}
