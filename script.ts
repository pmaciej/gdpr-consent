interface Vendor {
  name: string;
  id: string;
  policyUrl: string;
}
type VendorList = {[key: string]: Vendor};

let vendors: VendorList = {};
let cookieArray: Array<number> = [];
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

const fetchItems = async () => {
  if (getCookie('vendor')) {
    return;
  }
  const data = await fetch(
    'https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json',
    {
      method: 'GET',
    }
  );
  const items = await data.json();
  vendors = items.vendors;
  if (items) {
    openModal();
  }
};

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

function checkboxHandler(e: MouseEvent) {
  const target = e.target as HTMLInputElement;
  handleCheckBox(target);
}

function handleCheckBox(target: HTMLInputElement) {
  if (target.checked) {
    if (!cookieArray.includes(parseInt(target.id))) {
      cookieArray.push(parseInt(target.id));
    }
  } else {
    for (let i = 0; i < cookieArray.length; i++) {
      if (cookieArray[i] === parseInt(target.id)) {
        cookieArray.splice(i, 1);
        i--;
      }
    }
  }
}

function createCookie(name: string, value: any) {
  const now = new Date();
  const date = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  ).toUTCString();
  let cookieData = JSON.stringify(value);

  document.cookie = name + '=' + cookieData + ';expires=' + date + ';path=/';
}

function appendSingleVendor(targetDiv: HTMLElement, vendor: Vendor) {
  const {name: vendorName, id: vendorId, policyUrl: vendorUrl} = vendor;

  const div = document.createElement('div');
  div.id = vendorId;
  div.classList.add('vendor');
  targetDiv.appendChild(div);

  const input = document.createElement('input');
  const p = document.createElement('p');
  const a = document.createElement('a');

  input.setAttribute('type', 'checkbox');
  input.setAttribute('id', vendorId);

  const textnode = document.createTextNode(vendorName);
  p.appendChild(textnode);
  const linknode = document.createTextNode(vendorUrl);
  a.appendChild(linknode);
  a.title = vendorUrl;
  a.href = vendorUrl;

  div.appendChild(p);
  div.appendChild(a);
  div.appendChild(input);
}

function openModal() {
  const modalBody = document.getElementById('modal-body');
  modal?.classList.add('active');
  overlay?.classList.add('active');
  for (const index in vendors) {
    appendSingleVendor(modalBody!, vendors[index]);
  }
  modalBody?.addEventListener('click', (e) => {
    checkboxHandler(e);
  });

  const acceptButton = document.createElement('button');
  acceptButton.innerHTML = 'ACCEPT';
  acceptButton.onclick = function () {
    if (cookieArray.length) {
      createCookie('vendor', {accepted: true, vendors: cookieArray});
      closeModal();
    }
  };
  modalBody?.appendChild(acceptButton);

  const rejectButton = document.createElement('button');
  rejectButton.innerHTML = 'REJECT';
  rejectButton.onclick = function () {
    createCookie('vendor', {accepted: false});
    closeModal();
  };
  modalBody?.appendChild(rejectButton);

  const selectAllCheckboxes = document.createElement('button');
  selectAllCheckboxes.innerHTML = 'SELECT ALL';
  selectAllCheckboxes.onclick = function () {
    const checkboxes = document.querySelectorAll('.vendor input');
    for (let i = 0; i < checkboxes.length; i++) {
      (checkboxes[i] as HTMLInputElement).checked = true;
      handleCheckBox(checkboxes[i] as HTMLInputElement);
    }
  };
  modalBody?.appendChild(selectAllCheckboxes);
}

function closeModal() {
  modal?.classList.remove('active');
  overlay?.classList.remove('active');
}

fetchItems();
