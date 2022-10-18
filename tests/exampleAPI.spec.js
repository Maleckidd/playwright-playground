const { test, expect } = require('@playwright/test');

const apiKey = XXX;

test.use({
  baseURL: `https://.../api/rest/leads/?apiKey=${apiKey}`,
});

test.beforeEach(async ({ page }, testInfo) => {
  const newIssue = await request.get(``);
  const body = await newIssue.text();
  expect(body).toBe("[]")
  // IF NOT - here should be function to delete all existing leads
});

test('Should get empty leads array', async ({ request }) => {
  const newIssue = await request.get(``);
  expect(newIssue.status()).toBe(200);
  const body = await newIssue.text();
  expect(body).toBe("[]")
});

test('Should create lead', async ({ request }) => {
  const newIssue = await request.post(``,
    {
      data: {
        "id": "1",
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
      }
    }
  );
  expect(newIssue.status()).toBe(201);
  const body = await newIssue.text();
  expect(body).toBe(`
    {
      "id": "1",
      "firstName": "firstName",
      "lastName": "lastName",
      "email": "email@example.com",
      "company": "company",
      "country": "country",
      "state": "state",
      "phone": "123456789"
    }
  `)
});

test('Should get existing leads array', async ({ request }) => {
  const newIssue = await request.post(``,
    {
      data: {
        "id": "1",
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
      }
    }
  );
  expect(newIssue.status()).toBe(201);

  const newIssue = await request.post(``,
    {
      data: {
        "id": "1",
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
      }
    }
  );
  expect(newIssue.status()).toBe(201);

  for (let index = 0; index < 10; index++) {
    const newIssue = await request.get(``);
    expect(newIssue.status()).toBe(200);
    const body = await newIssue.text();
    expect(body).toBe(`[
    {
        "id": 1,
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
    },
    {
        "id": 2,
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
    }
  ]`)
  }
});

test('Should return specific lead', async ({ request }) => {
  const newIssue = await request.post(``,
    {
      data: {
        "id": "1",
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
      }
    }
  );
  expect(newIssue.status()).toBe(201);

  const newIssue = await request.post(``,
    {
      data: {
        "id": "1",
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
      }
    }
  );
  expect(newIssue.status()).toBe(201);

  const newIssue = await request.get(`&id=2`);
  expect(newIssue.status()).toBe(200);
  const body = await newIssue.text();
  expect(body).toBe(`[
    {
        "id": 2,
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
    }
  ]`);

});

test('Should delete lead', async ({ request }) => {
  const newIssue = await request.post(``,
    {
      data: {
        "id": "1",
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
      }
    }
  );
  expect(newIssue.status()).toBe(201);

  const newIssue = await request.post(``,
    {
      data: {
        "id": "1",
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
      }
    }
  );
  expect(newIssue.status()).toBe(201);

  const newIssue = await request.delete(`&id=1`);
  expect(newIssue.status()).toBe(204);

  const newIssue = await request.get(``);
  expect(newIssue.status()).toBe(200);
  const body = await newIssue.text();
  expect(body).toBe(`[
    {
        "id": 2,
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
    }
  ]`);
});

test('Should edit lead', async ({ request }) => {
  const newIssue = await request.post(``,
    {
      data: {
        "id": "1",
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
      }
    }
  );
  expect(newIssue.status()).toBe(201);

  const newIssue = await request.post(``,
    {
      data: {
        "id": "1",
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
      }
    }
  );
  expect(newIssue.status()).toBe(201);

  const newIssue = await request.put(`&id=2`,
    {
      data: {
        "id": "1",
        "firstName": "EditedfirstName",
        "lastName": "EditedlastName",
        "email": "Editedemail@example.com",
        "company": "Editedcompany",
        "country": "Editedcountry",
        "state": "Editedstate",
        "phone": "987654321"
      }
    }
  );
  expect(newIssue.status()).toBe(201);

  const newIssue = await request.get(``);
  expect(newIssue.status()).toBe(200);
  const body = await newIssue.text();
  expect(body).toBe(`[
    {
        "id": 1,
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "email@example.com",
        "company": "company",
        "country": "country",
        "state": "state",
        "phone": "123456789"
    },
    {
        "id": 2,
        "firstName": "EditedfirstName",
        "lastName": "EditedlastName",
        "email": "Editedemail@example.com",
        "company": "Editedcompany",
        "country": "Editedcountry",
        "state": "Editedstate",
        "phone": "987654321"
    }
  ]`);

});
