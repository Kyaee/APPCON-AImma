from dotenv import load_dotenv
from job_scraper_utils import *

load_dotenv()

"""
List of countries url.
"""
philippines = 'https://ph.indeed.com/'

def main():
    driver = configure_webdriver()
    country = philippines
    sender_email = os.getenv("SENDER_EMAIL")
    receiver_email = os.getenv("RECEIVER_EMAIL")
    password = os.getenv("PASSWORD")
    job_position = 'web developer'
    job_location = 'remote'
    date_posted = 20

    cleaned_df = None

    try:
        full_url = search_jobs(driver, country, job_position, job_location, date_posted)
        df = scrape_job_data(driver, country)

        if df.shape[0] == 1:
            print("No results found. Something went wrong.")
            subject = 'No Jobs Found on Indeed'
            body = """
            No jobs were found for the given search criteria.
            Please consider the following:
            1. Try adjusting your search criteria.
            2. If you used English search keywords for non-English speaking countries,
               it might return an empty result. Consider using keywords in the country's language.
            3. Try more general keyword(s), check your spelling or replace abbreviations with the entire word

            Feel free to try a manual search with this link and see for yourself:
            Link {}
            """.format(full_url)

            send_email_empty(sender_email, receiver_email, subject, body, password)
        else:
            cleaned_df = clean_data(df)
            # csv_file = save_csv(cleaned_df, job_position, job_location)
    finally:
        try:
            send_email(cleaned_df, sender_email, receiver_email, job_position, job_location, password)
        except Exception as e:
            print(f"Error sending email: {e}")
        finally:
            pass
            driver.quit()


if __name__ == "__main__":
    main()
