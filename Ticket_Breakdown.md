# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Before going into the tasks breakdown, Here is the assumed structure of the database of our application and current functionality, which we need to update:

---

| Facilities  | Agents   | Shifts      |
| ----------- | -------- | ----------- |
| Facility ID | Agent ID | Shift ID    |
| ...         | ...      | Agent ID    |
| ...         | ...      | Facility ID |

- getShiftsByFacility(FacilityID):

  Lists of all shifts for a facility with the metadata of agent of Agent

- generateReport(ListReturnedByAboveFunction):

  PDF Report

---

### Ticket 1: Add Backend support for Facilities to Save Custom IDs for Agents

#### Acceptance Criteria:

- Custom IDs should be associated with the corresponding (agent,Facility) tuple in "Custom Attributes" table record in the database.
- Custom ID should be unique

#### **Implementation Details**:

Assuming there is going to many to many relationship between Facility and Agent i.e 1 facility manages multiple Agents and 1 Agent can be managed by multiple Facilities. Considering it, we need to make a new table to make this functionality work.

With above, following will be the new schema of our database.

| Facilities      | Agents       | Shifts          | Custom Attributes  |
| --------------- | ------------ | --------------- | ------------------ |
| Facility ID (P) | Agent ID (P) | Shift ID (P)    | Facility ID (F, C) |
| ...             | ...          | Agent ID (F)    | Agent ID (F, C)    |
| ...             | ...          | Facility ID (F) | Custom ID          |

---

P.S: P stands for Primary key, F stands for Foreign key, C stands for the composite key.

---

Note: Adding custom id to Agents table will only work if there is 1 to many relation between Facility and Agents.

#### Action Items:

- [ ] Implement backend API endpoint to handle saving/updating custom IDs for an agent.
- [ ] Add validation rules for custom IDs, such as length restrictions or character limitations.
- [ ] Implement validation logic to check the uniqueness of custom IDs within each facility.
- [ ] Add a new table "Custom Attributes" schema with the above fields mentioned above in the table.
- [ ] Update/Add (If not existing) the record in "Custom Attributes" table.
- [ ] Add database queries and data access methods to get custom ID wrt Agent and Facility.

#### **Effort Estimate**:

6 hours

### Ticket 2: Allow Facilities to Save Custom IDs for Agents on Frontend

#### Acceptance Criteria:

- Facilities can add/edit custom IDs for agents they work with.
- Custom IDs should adhere to any specified format or rules.
- Backend Errors should be handled.

#### **Implementation Details**:

- [ ] Create an interface or form in the user interface where facilities can add/edit custom ID for an agent which they are managing.
- [ ] Display appropriate error messages in the user interface if the custom ID is not valid by validations on the frontend.
- [ ] Display appropriate error messages coming from the backend.

#### **Effort Estimate**:

4 hours

### Ticket 3: Update getShiftsByFacility() Function to Include Custom IDs

#### Acceptance Criteria:

- The getShiftsByFacility() function should retrieve the custom IDs of agents along with other metadata.

#### **Implementation Details**:

- [ ] Modify the database query in the getShiftsByFacility() function to fetch the custom IDs of agents.
- [ ] Update the data structure or model used to store the shifts and metadata to include the custom IDs.

#### **Effort Estimate**:

2 hours

### Ticket 4: Update Report Generation to Use Custom IDs

#### Acceptance Criteria:

- The generateReport() function should utilize the custom IDs associated with Agent instead of the Agent internal database Ids if `CustomIds` are available when generating reports.

#### **Implementation Details**:

- [ ] Modify the database query in the getShiftsByFacility() function to fetch the custom IDs of agents.
- [ ] Update the data structure or model used to store the shifts and metadata to include the custom IDs.

#### **Effort Estimate**:

1 hour

### Ticket 5: Write Unit Tests for Custom ID Functionality

#### Acceptance Criteria:

- Unit tests should be written to cover the newly added functionality related to custom IDs.

#### **Implementation Details**:

- [ ] Write unit tests to verify the saving/updating of custom IDs for agents.
- [ ] Write tests to validate the uniqueness and format of custom IDs.
- [ ] Write tests to ensure the getShiftsByFacility() function retrieves the correct custom IDs.
- [ ] Write tests to verify the generateReport() function uses the custom IDs in the reports.

#### **Effort Estimate**:

3 hours
