import { useState, useEffect } from 'react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';


const initialState = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
};

const EditProfile = ({ profile }) => {
    const [formData, setFormData] = useState(initialState);
    const [displayInputs, toggleDisplayInputs] = useState(false);
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {

        const profileData = { ...initialState };
        for (const key in profile) {
            if (key in profileData) profileData[key] = profile[key];
        }
        for (const key in profile.social) {
            if (key in profileData) profileData[key] = profile.social[key];
        }
        if (Array.isArray(profileData.skills))
            profileData.skills = profileData.skills.join(', ');
        setFormData(profileData);

    }, [profile]);

    return (
        <>
            <section className='container'>

                <h1 className='large text-primary'>Create Your Profile</h1>
                <p className='lead'>
                    <i className='fas fa-user' />
                    Let's get some information to make your
                </p>
                <small>* = required field</small>
                <form className='form' onSubmit={onSubmit}>
                    <div className='form-group'>
                        <select name='status' value={status} onChange={onChange}>
                            <option>* Select Professional Status</option>
                            <option value='Developer'>Developer</option>
                            <option value='Junior Developer'>Junior Developer</option>
                            <option value='Senior Developer'>Senior Developer</option>
                            <option value='Manager'>Manager</option>
                            <option value='Student or Learning'>Student or Learning</option>
                            <option value='Instructor'>Instructor or Teacher</option>
                            <option value='Intern'>Intern</option>
                            <option value='Other'>Other</option>
                        </select>
                        <small className='form-text'>
                            Give us an idea of where you are at in your career
                        </small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Company'
                            name='company'
                            value={company}
                            onChange={onChange}
                        />
                        <small className='form-text'>
                            Could be your own company or one you work for
                        </small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Website'
                            name='website'
                            value={website}
                            onChange={onChange}
                        />
                        <small className='form-text'>
                            Could be your own or a company website
                        </small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Location'
                            name='location'
                            value={location}
                            onChange={onChange}
                        />
                        <small className='form-text'>
                            City & state suggested (eg. Boston, MA)
                        </small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='* Skills'
                            name='skills'
                            value={skills}
                            onChange={onChange}
                        />
                        <small className='form-text'>
                            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                        </small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Github Username'
                            name='githubusername'
                            value={githubusername}
                            onChange={onChange}
                        />
                        <small className='form-text'>
                            If you want your latest repos and a Github link, include your
                            username
                        </small>
                    </div>
                    <div className='form-group'>
                        <textarea
                            placeholder='A short bio of yourself'
                            name='bio'
                            value={bio}
                            onChange={onChange}
                        />
                        <small className='form-text'>Tell us a little about yourself</small>
                    </div>

                    <div className='my-2'>
                        <button
                            onClick={() => toggleDisplayInputs(!displayInputs)}
                            type='button'
                            className='btn btn-light'
                        >
                            Add Social Network Links
                        </button>
                        <span>Optional</span>
                    </div>

                    {displayInputs && (
                        <>
                            <div className='form-group social-input'>
                                <i className='fab fa-twitter fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Twitter URL'
                                    name='twitter'
                                    value={twitter}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group social-input'>
                                <i className='fab fa-facebook fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Facebook URL'
                                    name='facebook'
                                    value={facebook}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group social-input'>
                                <i className='fab fa-youtube fa-2x' />
                                <input
                                    type='text'
                                    placeholder='YouTube URL'
                                    name='youtube'
                                    value={youtube}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group social-input'>
                                <i className='fab fa-linkedin fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Linkedin URL'
                                    name='linkedin'
                                    value={linkedin}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group social-input'>
                                <i className='fab fa-instagram fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Instagram URL'
                                    name='instagram'
                                    value={instagram}
                                    onChange={onChange}
                                />
                            </div>
                        </>
                    )}

                    <input type='submit' className='btn btn-primary my-1' />
                    <Link className='btn btn-light my-1' href='/dashboard'>
                        Go Back
                    </Link>
                </form>
            </section>
        </>
    );
};

export const getServerSideProps = async ctx => {
    try {
        const { token } = parseCookies(ctx);

        const { data } = await axios.get(`${baseUrl}/api/profile/me`, {
            headers: { Authorization: token }
        });

        return { props: { profile: data } }

    } catch (error) {
        return { props: { errorLoading: true } }
    }
}

export default EditProfile;
