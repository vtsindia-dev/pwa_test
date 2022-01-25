import React, { Fragment } from 'react';
import { Facebook, Instagram, Twitter } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';

import Logo from '../Logo';
import Newsletter from '../Newsletter';
import { useStyle } from '../../classify';
import defaultClasses from './footer.module.css';
import { DEFAULT_LINKS, LOREM_IPSUM } from './sampleData';

const Footer = props => {
    const { links } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useFooter();

    const { copyrightText } = talonProps;

    const linkGroups = Array.from(links, ([groupKey, linkProps]) => {
        const linkElements = Array.from(linkProps, ([text, pathInfo]) => {
            let path = pathInfo;
            let Component = Fragment;
            if (pathInfo && typeof pathInfo === 'object') {
                path = pathInfo.path;
                Component = pathInfo.Component;
            }

            const itemKey = `text: ${text} path:${path}`;
            const child = path ? (
                <Link className={classes.link} to={path} data-cy="Footer-link">
                    <FormattedMessage id={text} defaultMessage={text} />
                </Link>
            ) : (
                <span className={classes.label}>
                    <FormattedMessage id={text} defaultMessage={text} />
                </span>
            );

            return (
                <Component key={itemKey}>
                    <li className={classes.linkItem}>{child}</li>
                </Component>
            );
        });

        return (
            <ul key={groupKey} className={classes.linkGroup}>
                {linkElements}
            </ul>
        );
    });

    return (
        <div className={classes.footerSec}>
        <footer className={classes.root} data-cy="Footer-root">
                <div className={classes.links}>
                    {/* <ul className={classes.linkGroups}>
                        <li className={classes.linkItem}>
                            <Link className={classes.logo} to="/">
                                <Logo />
                            </Link>
                        </li>
                        <li className={classes.linkItem}>
                            <span>Wabi Sabi</span>
                        </li>
                    </ul> */}
                    <div className={classes.aboutCol}>
                        <span className={classes.aboutHeading}>
                            <FormattedMessage
                                id={'footer.logoText'}
                                defaultMessage={'Wabi Sabi'}
                            />
                        </span>
                        <p className={classes.aboutBody}>
                            <FormattedMessage
                                id={'footer.aboutText'}
                                defaultMessage={LOREM_IPSUM}
                            />
                        </p>
                    </div>
                    <div className={classes.callout}>
                        <span className={classes.calloutHeading}>
                            <FormattedMessage
                                id={'footer.followText'}
                                defaultMessage={'Contact Info'}
                            />
                        </span>
                        <div className={classes.calloutList}>
                        <p className={classes.calloutLabel}>
                            <FormattedMessage
                                id={'footer.calloutLabel'}
                                defaultMessage={'Address'}
                            />
                        </p>
                        <p className={classes.calloutValue}>
                            <FormattedMessage
                                id={'footer.calloutValue'}
                                defaultMessage={LOREM_IPSUM}
                            />
                        </p>
                        </div>
                        <div className={classes.calloutList}>
                        <p className={classes.calloutLabel}>
                            <FormattedMessage
                                id={'footer.calloutLabel'}
                                defaultMessage={'Phone'}
                            />
                        </p>
                        <p className={classes.calloutValue}>
                            <FormattedMessage
                                id={'footer.calloutValue'}
                                defaultMessage={'+91 9854548231'}
                            />
                        </p>
                        </div>
                        <div className={classes.calloutList}>
                        <p className={classes.calloutLabel}>
                            <FormattedMessage
                                id={'footer.calloutLabel'}
                                defaultMessage={'Email'}
                            />
                        </p>
                        <p className={classes.calloutValue}>
                            <FormattedMessage
                                id={'footer.calloutValue'}
                                defaultMessage={'wabi-sabi@gmail.com'}
                            />
                        </p>
                        </div>
                        {/* <p className={classes.calloutBody}>
                            <FormattedMessage
                                id={'footer.calloutText'}
                                defaultMessage={LOREM_IPSUM}
                            />
                        </p> */}                        
                        <ul className={classes.socialLinks}>
                            <li>
                                <Facebook size={20}  fill='white' color="transparent"/>
                            </li>
                            <li>
                                <Twitter size={20}  fill='white' color="transparent"/>
                            </li>
                            <li>
                                <Instagram size={20} color='white'/>
                            </li>
                        </ul>
                    </div>
                    {linkGroups}
                    <Newsletter />
                </div>
                <div className={classes.branding}>
                    <p className={classes.copyright}>{copyrightText || null}</p>
                    <ul className={classes.legal}>
                        <li className={classes.terms}>
                            <FormattedMessage
                                id={'footer.termsText'}
                                defaultMessage={'Terms of Use'}
                            />
                        </li>
                        <li className={classes.privacy}>
                            <FormattedMessage
                                id={'footer.privacyText'}
                                defaultMessage={'Privacy Policy'}
                            />
                        </li>
                    </ul>
                </div>
        </footer>
        </div>
    );
};

export default Footer;

Footer.defaultProps = {
    links: DEFAULT_LINKS
};

Footer.propTypes = {
    classes: shape({
        root: string
    })
};
